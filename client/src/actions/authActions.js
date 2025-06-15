import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const login = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { email, password });
    localStorage.setItem('token', res.data.token);
    return res.data.token;
  } catch (error) {
    return rejectWithValue(error.response.data.msg);
  }
});

export const signup = createAsyncThunk('auth/signup', async ({ email, password }, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, { email, password });
    localStorage.setItem('token', res.data.token);
    return res.data.token;
  } catch (error) {
    return rejectWithValue(error.response.data.msg);
  }
});