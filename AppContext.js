import React, { useReducer, useMemo } from "react";
import { fetchProjects } from "./api";

export const AppContext = React.createContext({});

export const initialState = {
  pageNumber: 0,
  projects: [],
  isLoading: true,
  isLoadingAdditionalProjects: false,
  searchString: "",
  selectedProjectId: "",
  selectedProject: {},
  isSelectedProjectLoading: false,
};

export const actions = {
  APP_LOADING_STATUS: "APP_LOADING_STATUS",
  LOAD_PROJECTS_SUCCESS: "LOAD_PROJECTS_SUCCESS",
  LOAD_ADDITIONAL_PROJECTS_SUCCESS: "LOAD_ADDITIONAL_PROJECTS_SUCCESS",
  ADDITIONAL_PROJECTS_LOADING: "ADDITIONAL_PROJECTS_LOADING",
  SELECTED_PROJECT_ID: "SELECTED_PROJECT_ID",
  LOAD_SELECTED_PROJECT: "LOAD_SELECTED_PROJECT",
  LOAD_SELECTED_PROJECT_LOADING: "LOAD_SELECTED_PROJECT_LOADING",
  UPDATE_SEARCH_STRING: "UPDATE_SEARCH_STRING",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.APP_LOADING_STATUS:
      return { ...state, isLoading: action.isLoading };
    case actions.LOAD_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.data.projects,
        isLoading: false,
      };
    case actions.ADDITIONAL_PROJECTS_LOADING:
      return {
        ...state,
        isLoadingAdditionalProjects: true,
      };
    case actions.LOAD_ADDITIONAL_PROJECTS_SUCCESS:
      return {
        isLoadingAdditionalProjects: false,
        projects: [...state.projects, ...action.data.projects],
        pageNumber: action.data.pageNumber,
      };
    case actions.LOAD_SELECTED_PROJECT:
      return {
        ...state,
        selectedProject: action.data.project,
        isSelectedProjectLoading: false,
      };
    case actions.LOAD_SELECTED_PROJECT_LOADING:
      return {
        ...state,
        isSelectedProjectLoading: true,
      };
    case actions.SELECTED_PROJECT_ID:
      return { ...state, selectedProjectId: action.selectedProjectId };
    case actions.UPDATE_SEARCH_STRING:
      return { ...state, searchString: action.searchString };
    case actions.PROJECT_DETAILS_LOADING:
      return { ...state, isLoadingProjectDetails: true };
    default:
      return state;
  }
};

export const AppContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  const fetchProjectsHandler = (searchString) => {
    fetchProjects(state.pageNumber, dbdSearchString).then((projects) => {
      dispatch({
        type: actions.LOAD_PROJECTS_SUCCESS,
        data: {
          projects: projects,
        },
      });
    });
  };

  const endReachedHandler = ({ distanceFromEnd }) => {
    const nextPage = state.pageNumber + 1;
    dispatch({
      type: actions.ADDITIONAL_PROJECTS_LOADING,
    });

    fetchProjects(nextPage).then((_projects) => {
      dispatch({
        type: actions.LOAD_ADDITIONAL_PROJECTS_SUCCESS,
        data: {
          projects: _projects,
          pageNumber: nextPage,
        },
      });
    });
  };

  const searchHandler = (text) => {
    dispatch({
      type: actions.UPDATE_SEARCH_STRING,
      searchString: text,
    });
  };

  return (
    <AppContext.Provider
      value={{
        ...contextValue,
        fetchProjectsHandler,
        endReachedHandler,
        searchHandler,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export const AppContextConsumer = AppContext.Consumer;
