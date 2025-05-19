import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk de connexion
export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password, remember }, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Authentication failed");

      // Si "Remember me" est coché, on garde le token dans le localStorage
      if (remember) {
        localStorage.setItem("token", data.body.token);
      }

      return { token: data.body.token };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Thunk pour récupérer le profil utilisateur
export const getUserProfile = createAsyncThunk(
  "user/profile",
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "GET", 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to get profile");

      return {
        userName: data.body.userName,
        firstName: data.body.firstName,
        lastName: data.body.lastName,
        email: data.body.email,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Thunk pour mettre à jour le userName
export const updateUserName = createAsyncThunk(
  "user/updateUserName",
  async ({ newUserName, token }, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userName: newUserName }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to update user name");

      return newUserName;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  userName: null,
  firstName: null,
  lastName: null,
  email: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action pour définir le token après la connexion
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    // Action pour définir le userName
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    // Action pour déconnecter l'utilisateur
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.userName = null;
      state.firstName = null;
      state.lastName = null;
      state.email = null;
      localStorage.removeItem("token"); // Retirer le token du localStorage
    },
    // Action pour effacer l'erreur dans l'état
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Pour le login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Pour récupérer le profil utilisateur
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userName = action.payload.userName;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.email = action.payload.email;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //  mettre à jour le userName
      .addCase(updateUserName.fulfilled, (state, action) => {
        state.userName = action.payload;
      })
      .addCase(updateUserName.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setToken, setUserName, logout, clearError } = userSlice.actions;

export default userSlice.reducer;
