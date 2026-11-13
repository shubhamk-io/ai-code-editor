import axios from "axios";

export const createRootFolder = async ({ projectId, projectName }) => {
  try {
    const { data } = await axios.post("/api/file/create-root-folder", {
      projectId,
      projectName,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

//  creae folder api fetch
export const createFolder = async ({ projectId, name, parentId }) => {
  try {
    const { data } = await axios.post("/api/file/create-folder", {
      projectId,
      name,
      parentId,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

// Create file route fetch api
export const createFile = async ({
  projectId,
  projectName,
  name,
  parentId,
  content = "",
  language = "plainText",
}) => {
  try {
    const { data } = await axios.post("/api/file/create-File", {
      projectId,
      projectName,
      name,
      parentId,
      content,
      language,
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

//  create updatefile fetch api
export const updateFlile = async ({ name, content, id }) => {
  try {
    const { data } = await axios.post(`/api/file/update/${id}`, {
      name,
      content,
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

//  Delete file route fetch api
export const deleteFile = async ({ id }) => {
  try {
    const { data } = await axios.delete(`/api/file/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

// GetFile fetch api

export const getFile = async ({ id }) => {
  try {
    const { data } = await axios.get(`/api/file/${id} `);

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// Tree fetch api
export const getTree = async ({ projectId }) => {
  try {
    const { data } = await axios.get(`/api/file/tree/${projectId}`);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
