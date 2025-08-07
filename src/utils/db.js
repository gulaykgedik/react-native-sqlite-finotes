import SQLite from 'react-native-sqlite-storage';

// DB Bağlantısı kur
const db = SQLite.openDatabase(
    {
        name: "NoteAppDB",
        location: "default"
    },
    () => {
        console.log('Database opened.')
    },
    (error) => {
        console.log('DB ERROR:', error)
    }
);


// DB'ye bağlandıktan sonra tablo oluşturma vs. gibi ilk teferruatı hallet.
export const initializeDatabase = () => {
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, email TEXT, password TEXT, location TEXT);'
        );
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS Notes (id INTEGER PRIMARY KEY AUTOINCREMENT, userid INTEGER NOT NULL, title TEXT, description TEXT, FOREIGN KEY(userid) REFERENCES Users(id) )'
        )
    },
        (error) => console.log('DB initialize error', error),

        () => console.log("All tables were successfully created.")
    )
};


// KULLANICI FONKSİYONLARI

export const insertUserIfNotExists = async (user) => {

    return new Promise((resolve, reject) => {

        // sql komut bloğu
        db.transaction(tx => {


            //sql komutunun kendisi
            // ilk önce bize verilen e postaya sahip kullanıcı var mı bakarız.
            tx.executeSql(
                'SELECT * FROM Users WHERE email = ?',
                [user.email],
                (tx, results) => {
                    //girdiğimiz e posta adresine sahip kullanıcılar satırı 0'dan büyükse
                    //(bizim eposta adresimize zaten sahip olan kullanıcı varsa)
                    if (results.rows.length > 0) {

                        reject({ success: false, message: 'Bu e-posta zaten kullanımda.' })
                    }
                    else {
                        //eğer bu epostaya sahip kullanıcı yoksa yeni kayıt ekle
                        tx.executeSql(
                            'INSERT INTO Users (username, email, password, location) VALUES (?,?,?,?)',
                            [user.username, user.email, user.password, user.location],
                            (_, results) => {
                                resolve({
                                    success: true,
                                    message: 'Kullanıcı başarıyla kaydoldu.',
                                    userId: results.insertId
                                })
                            },
                            (_, error) => {
                                reject({ success: false, message: error.message || 'Kullanıcı eklerken hata oluştu.' })
                            }
                        )
                    }
                },
                (_, error) => {
                    reject({ success: false, error: error.message || 'Kullanıcı var mı yok mu bulunamadı.' })
                }
            )
        }
        )
    }
    )




}

// bu fonksiyon, verilen ID'ye göre bahsedilen kullanıcı var mı yok mu onu bulur. Şifre veya email kontrolü ve doğrulaması yapmaz, dolayısıyla Login işlemi için güvensizdir, sadece halihazırda login yapmış kullanıcıların erişebilmesi için uygundur.


export const getUserFromDb = async (id) => {

    return new Promise((resolve, reject) => {


        db.transaction(tx => {

            tx.executeSql(
                'SELECT * FROM Users WHERE id = ?',
                [id],
                (_, results) => {
                    if (results.rows.length > 0) {
                        const user = results.rows.item(0);

                        resolve({ success: true, message: 'Kullanıcı başarıyla getirildi.', user })
                    }
                    else {
                        reject({ success: false, message: 'Aradığınız kullanıcı bulunamadı.' })
                    }
                },
                (_, error) => {

                    reject({
                        success: false,
                        message: 'Kullanıcı bulunurken hata oluştu.',
                        error
                    })
                }
            )
        })
    })
}


// şimdi bir de login yapmamış kullanıcıların email ve şifre girerek login yapmasına izin veren, email veyahut şifre yanlış ise reddeden bir sql komutu yazacağız.

export const loginFromDb = async (email, password) => {

    return new Promise((resolve, reject) => {

        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM Users WHERE email = ?',
                [email],
                // başarılı olması durumunda
                (tx, results) => {
                    // aranan epostaya sahip kullanıcı mevcut mu? (satır sayısı 0'dan büyük mü)
                    if (results.rows.length > 0) {
                        const user = results.rows.item(0);
                        // tamam kullanıcı var ama doğru şifreyi mi girdik?
                        if (user.password == password) {
                            resolve({ success: true, message: 'Giriş başarılı', user })
                        } else {
                            reject({ success: false, message: 'Kullanıcı bilgilerini kontrol edip tekrar deneyiniz' })
                        }

                    } else { reject({ success: false, message: 'Kullanıcı bilgilerini kontrol edip tekrar deneyiniz' }) }
                },

                (_, error) => { reject({ success: false, error }) }
            )
        })
    })
}


// kullanıcının bilgilerini güncelleme fonksiyonu

export const updateUserFromDb = async ({username, password, location, id}) => {

    return new Promise((resolve,reject)=>{

        db.transaction(tx=>
            tx.executeSql(
                'UPDATE Users SET username=?, password=?, location=? WHERE id=?',
                [username, password, location, id],
                (tx,results)=>{
                    if(results.rowsAffected > 0){
                        
                        // güncelleme yaptıktan sonra, güncellediğin kullanıcıyı bulacak bir SQL sorgusu daha çalıştır

                        tx.executeSql(
                            'SELECT * FROM Users WHERE id = ?',
                            [id],
                            (_,results)=>{
                                resolve({
                                    success:true,
                                    message:"Kullanıcı başarıyla güncellendi",
                                    data: results.rows.item(0)
                                })
                            },
                            (_,error)=>{
                                reject(error)
                            }
                        )


                    } else reject({ success: false, message: "Güncelleme başarısız."})
                },

                (_,error)=>{
                    reject(error)
                }
            )
        )
    })
}



// ---------------------------------------------------------------------------


// NOT FONKSİYONLARI

// Not oluşturma
export const insertNoteDb = ({ userid, title, description }) => {
    return new Promise((resolve, reject) => {

        db.transaction(tx =>
            tx.executeSql(
                'INSERT OR REPLACE INTO Notes (userid, title, description) VALUES (?,?,?)',
                [userid, title, description],
                (tx, results) => {
                    tx.executeSql(
                        'SELECT * FROM Notes WHERE id = ?',
                        [results.insertId],
                        (_, results) => {
                            resolve({
                                success: true,
                                message: "Not başarıyla eklendi",
                                note: results.rows.item(0)
                            })
                        },
                        (_, error) => {
                            console.log(error)
                            reject(error)
                        }
                    )
                },
                (_, error) => {
                    console.log(error)
                    reject(error)
                }
            )
        )
    })
}

// bütün notları alma
export const getAllNotesFromDb = ({ userid }) => {
    return new Promise((resolve, reject) => {

        db.transaction(tx =>

            tx.executeSql(
                'SELECT * FROM Notes WHERE userid = ?',
                [userid],
                (_, results) => {
                    const len = results.rows.length;
                    const notes = [];
                    for (let i = 0; i < len; i++) {
                        notes.push(results.rows.item(i));
                    }

                    resolve(notes);
                },

                (_, error) => {
                    reject(error);
                }
            )

        )
    })
}


// not silme

export const deleteNoteFromDb = async noteId => {
    return new Promise((resolve, reject) => {
        db.transaction(tx =>
            tx.executeSql(
                'DELETE FROM Notes WHERE id = ?',
                [noteId],
                (_, results) => {
                    if (results.rowsAffected > 0) {
                        resolve({ success: true, message: "Silme işlemi başarılı" })
                    }
                    else {
                        reject({ success: false, message: "Silme işlemi başarısız." })
                    }
                },
                (_, error) => {
                    reject(error);
                }
            )
        )
    })
}


// varolan notu güncelleme fonksiyonu

export const updateNoteFromDb = async ({ noteId, title, description, userid }) => {


    return new Promise((resolve, reject) => {

        db.transaction(tx =>
            tx.executeSql(
                'UPDATE Notes SET title = ?, description = ? WHERE id = ?;',
                [title, description, noteId],
                (tx, result) => {
                    // güncelleme işlemi başarılıysa bütün notları SQL kullanarak tekrardan alalım ve cevap olarak gönderelim
                    tx.executeSql(
                        'SELECT * FROM Notes WHERE userid = ?',
                        [userid],
                        (_, results) => {
                            const len = results.rows.length;
                            const notes = [];
                            for (let i = 0; i < len; i++) {
                                notes.push(results.rows.item(i));
                            }

                            resolve({
                                success: true,
                                message: "Not başarıyla güncellendi.",
                                data: notes
                            });
                        },

                        (_, error) => {
                            reject(error);
                        }
                    )
                },

                (_, error) => {
                    console.error('Error', error);
                    reject({
                        success: false,
                        message: "Not güncellenirken hata oluştu."
                    })
                }
            )
        )

    })

}