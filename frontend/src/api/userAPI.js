const API_URL = "/api/users";

export const register = async (user) => {
  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "registration failed.");
  }
  const tokenObj = {
    user: data.user,
    token: data.token,
    expiry: Date.now() + 1000 * 60 * 60 * 24 * 7,
  };
  localStorage.setItem("rsToken", JSON.stringify(tokenObj));
  return data;
};

export const login = async (user) => {
  const res = await fetch(API_URL + "/login", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "login failed.");
  }
  const tokenObj = {
    user: data.user,
    token: data.token,
    expiry: Date.now() + 1000 * 60 * 60 * 24 * 7,
  };
  localStorage.setItem("rsToken", JSON.stringify(tokenObj));
  return data;
};

export const getMe = async (token) => {
  const res = await fetch(API_URL + "/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "token is not valid");
  }
  localStorage.setItem("rsToken", data.token);
  return data;
};

export const searchUser = async (token, searchTxt) => {
  const res = await fetch(API_URL + `/search?q=${searchTxt}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "token is not valid");
  }
  return data;
};

export const getUserDetail = async (token, userId) => {
  const res = await fetch(API_URL + "/" + userId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "cannot find user");
  }
  return data;
};

export const toggleFollowing = async (token, userId) => {
  const res = await fetch(API_URL + "/" + userId, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "API call failed");
  }
  return data;
};

export const getFollowing = async (token, uid) => {
  const res = await fetch(API_URL + "/" + uid + "/following", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "token is not valid");
  }
  return data;
};

export const getFollowers = async (token, uid) => {
  const res = await fetch(API_URL + "/" + uid + "/followers", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "token is not valid");
  }
  return data;
};

export const getFollowingPosts = async (token) => {
  const res = await fetch(API_URL + "/following/posts", {
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
}