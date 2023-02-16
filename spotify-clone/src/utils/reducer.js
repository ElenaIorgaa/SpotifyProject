import { reducerCases } from "./Constants";

export const initialState = {
  token: null,
  id: null,
  roles: null,
  playlists: [],
  songs: [],
  admin: false,
  songs_page: false,
  users_page: false,
  users: [],
  edit_user: false,
  selected_user: [],
  add_new_user: false,
  current_user: null,
  content_manager: false,
  artists_page: false,
  current_song: [],
  edit_song: false,
  add_new_song: false,
  artists: [],
  add_new_artist: false,
  artist: false,
  current_user_songs: [],
  current_artist_id: null,
  add_new_song2: false,
  id_song: null,
  client: false,
  add_new_playlist: false,
  current_playlist: [],
  edit_playlist: false,
  user_profile: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case reducerCases.SET_USER_ID:
      return {
        ...state,
        id: action.id,
      };
    case reducerCases.SET_USER_ROLES:
      return {
        ...state,
        roles: action.roles,
      };
    case reducerCases.SET_PLAYLISTS:
      return {
        ...state,
        playlists: action.playlists,
      };
    case reducerCases.SET_SONGS:
      return {
        ...state,
        songs: action.songs,
      };
    case reducerCases.SET_ARTISTS_PAGE:
      return {
        ...state,
        artists_page: action.artists_page,
      };
    case reducerCases.SET_ADMIN:
      return {
        ...state,
        admin: action.admin,
      };
    case reducerCases.SET_SONGS_PAGE:
      return {
        ...state,
        songs_page: action.songs_page,
      };
    case reducerCases.SET_USERS_PAGE:
      return {
        ...state,
        users_page: action.users_page,
      };
    case reducerCases.SET_USERS:
      return {
        ...state,
        users: action.users,
      };
    case reducerCases.SET_EDIT_USER:
      return {
        ...state,
        edit_user: action.edit_user,
      };
    case reducerCases.SET_SELECTED_USER:
      return {
        ...state,
        selected_user: action.selected_user,
      };
    case reducerCases.SET_ADD_NEW_USER:
      return {
        ...state,
        add_new_user: action.add_new_user,
      };
    case reducerCases.SET_CURRENT_USER:
      return {
        ...state,
        current_user: action.current_user,
      };
    case reducerCases.SET_CONTENT_MANAGER:
      return {
        ...state,
        content_manager: action.content_manager,
      };
    case reducerCases.SET_CURRENT_SONG:
      return {
        ...state,
        current_song: action.current_song,
      };
    case reducerCases.SET_EDIT_SONG:
      return {
        ...state,
        edit_song: action.edit_song,
      };
    case reducerCases.SET_ADD_NEW_SONG:
      return {
        ...state,
        add_new_song: action.add_new_song,
      };
    case reducerCases.SET_ARTISTS:
      return {
        ...state,
        artists: action.artists,
      };
    case reducerCases.SET_ADD_NEW_ARTIST:
      return {
        ...state,
        add_new_artist: action.add_new_artist,
      };

    case reducerCases.SET_ARTIST:
      return {
        ...state,
        artist: action.artist,
      };
    case reducerCases.SET_CURRENT_USER_SONGS:
      return {
        ...state,
        current_user_songs: action.current_user_songs,
      };
    case reducerCases.SET_ADD_NEW_SONG2:
      return {
        ...state,
        add_new_song2: action.add_new_song2,
      };
    case reducerCases.SET_ID_SONG:
      return {
        ...state,
        id_song: action.id_song,
      };
    case reducerCases.SET_CURRENT_ARTIST_ID:
      return {
        ...state,
        current_artist_id: action.current_artist_id,
      };
    case reducerCases.SET_CLIENT:
      return {
        ...state,
        client: action.client,
      };
    case reducerCases.SET_ADD_NEW_PLAYLIST:
      return {
        ...state,
        add_new_playlist: action.add_new_playlist,
      };
    case reducerCases.SET_CURRENT_PLAYLIST:
      return {
        ...state,
        current_playlist: action.current_playlist,
      };
    case reducerCases.SET_EDIT_PLAYLIST:
      return {
        ...state,
        edit_playlist: action.edit_playlist,
      };
    case reducerCases.SET_USER_PROFILE:
      return {
        ...state,
        user_profile: action.user_profile,
      };
    default:
      return state;
  }
};
export default reducer;
