export const createAccount = async ({ cometChat, id, fullname, avatar }) => {
    const authKey = `${process.env.REACT_APP_COMETCHAT_AUTH_KEY}`;
    const user = new cometChat.User(id);
    user.setName(fullname);
    user.setAvatar(avatar);
    return await cometChat.createUser(user, authKey);
  };
  
  export const login = async (cometChat, user) => {
    if (!user) return;
    const authKey = `${process.env.REACT_APP_COMETCHAT_AUTH_KEY}`;
    return await cometChat.login(user.id, authKey);
  };
  
  export const createFriend = async (userId, friendId) => {
    const cometChatAppId = `${process.env.REACT_APP_COMETCHAT_APP_ID}`;
    const cometChatAppRegion = `${process.env.REACT_APP_COMETCHAT_REGION}`;
    const cometChatApiKey = `${process.env.REACT_APP_COMETCHAT_API_KEY}`;
    const url = `https://${cometChatAppId}.api-${cometChatAppRegion}.cometchat.io/v3/users/${userId}/friends`;
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        appId: cometChatAppId,
        apiKey: cometChatApiKey,
      },
      body: JSON.stringify({ accepted: [friendId] }),
    };
    try {
      await fetch(url, options);
    } catch (error) {}
  };