const API_URL = "/api/posts";

export const createPost = async (token, postBody) => {
  const res = await fetch(API_URL, {
    body: JSON.stringify(postBody),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Cannot create post");
  }
  return data;
};

export const deletePost = async (token, pid) => {
  const res = await fetch(API_URL + "/" + pid, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Cannot delete post");
  }
  return data;
}

export const getAllPosts = async (token) => {
  const res = await fetch(API_URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Cannot fetch data, try again later");
  }
  return data;
};

export const toggleLike = async (token, id) => {
  const res = await fetch(API_URL + "/" + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Cannot fetch data, try again later");
  }
  return data;
};

export const getPost = async (token, pid) => {
  const res = await fetch(API_URL + "/" + pid, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Cannot fetch data, try again later");
  }
  return data;
};

export const addComment = async (token, pid, comment) => {
  const res = await fetch(API_URL + "/" + pid + "/comments", {
    method: "POST",
    body: JSON.stringify(comment),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Cannot add comment, try again later");
  }
  return data;
};

export const deleteComment = async (token, pid, cid) => {
  const res = await fetch(API_URL + "/" + pid + "/comments/" +cid, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Cannot add comment, try again later");
  }
  return data;
}
