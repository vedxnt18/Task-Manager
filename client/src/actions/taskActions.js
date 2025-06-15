import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export const getTasks = createAsyncThunk('tasks/getTasks', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    setAuthToken(token);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/tasks`);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data.msg);
  }
});

export const addTask = createAsyncThunk('tasks/addTask', async ({ title, description }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    setAuthToken(token);
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/tasks`, { title, description });
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data.msg);
  }
});

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, title, description, status }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    setAuthToken(token);
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/tasks/${id}`, { title, description, status });
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data.msg);
  }
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    setAuthToken(token);
    await axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response.data.msg);
  }
});

export const toggleTaskStatus = createAsyncThunk('tasks/toggleTaskStatus', async (id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    setAuthToken(token);
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/tasks/toggle/${id}`);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data.msg);
  }
});