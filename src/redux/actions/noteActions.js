import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteNoteFromDb, getAllNotesFromDb, insertNoteDb, updateNoteFromDb } from "../../utils/db";

export const createNote = createAsyncThunk(
    'notes/createNote',
    async ({ userid, title, description }, { rejectWithValue }) => {
        try {

            const result = await insertNoteDb({ userid, title, description });

            return result;
        }
        catch (err) {
            console.error(err);
            rejectWithValue(err.message);
        }

    }
)

export const getAllNotes = createAsyncThunk(
    'notes/getAllNotes',
    async ({ userid }, { rejectWithValue }) => {
        try {

            const result = await getAllNotesFromDb({ userid });

            console.log("get all notes sonucu:", result)

            return result
        }
        catch (err) {
            rejectWithValue(err);
        }
    }
)


export const deleteNote = createAsyncThunk(
    'notes/deleteNote',
    async ({ id }, { rejectWithValue, dispatch, getState }) => {
        try {

            // Thunk'ın içinde, diğer thunkları dispatch parametresini alarak çağırabilirsiniz.

            // Örn. not silme thunkında, notu sildikten sonra bütün notları database'den çeken Thunk'ı çağırabilirsiniz.

            // getState ise, reduxta tuttuğunuz bütün değişkenlere (aktif kullanıcı, notlar, yüklenme durumları vs.) thunktan erişebilmenizi sağlar.



            // 1) not silme kısmı
            await deleteNoteFromDb(id);


            // 2) notu sildikten sonra database'deki bütün notları tekrardan çek

            // a) şuanki kullanıcının idsine eriş
            const userid = getState().auth.user.id


            // b) bu kullanıcının notlarını alan thunkı çağır

            const response2 = await dispatch(getAllNotes({ userid }));


            return response2

        }
        catch (err) {
            console.error(err);
            rejectWithValue(err)
        }
    }
)

export const updateNote = createAsyncThunk(
    'notes/updateNote',
    async ({ noteId, title, description }, { getState }) => {
        try {
            const userid = getState().auth.user.id;

            const response = await updateNoteFromDb({ noteId, title, description, userid });

            return response.data;
        }
        catch (err) {
            console.error(err)
        }
    }
)