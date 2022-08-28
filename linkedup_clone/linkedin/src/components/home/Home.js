import { useState, useEffect, useRef, useContext, useCallback } from "react";
import validator from "validator";
import { v4 as uuidv4 } from "uuid";

import * as firebaseService from "../../services/firebase";

import Context from "../../context";

const Home = () => {
  const [postImage, setPostImage] = useState(null);
  const [posts, setPosts] = useState([]);

  const postContentRef = useRef(null);
  const filepickerRef = useRef(null);
  const postsRef = useRef(firebaseService.getRef("posts"));

  const { user } = useContext(Context);

  const loadPosts = useCallback((keywords) => {
    firebaseService.getDataRealtime(postsRef, onDataLoaded);
  }, []);

  const onDataLoaded = (val) => {
    if (val) {
      const keys = Object.keys(val);
      const data = keys.map((key) => val[key]);
      setPosts(() => data);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const uploadPostImage = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setPostImage(readerEvent.target.result);
    };
  };

  const createPost = async () => {
    const content = postContentRef.current.value;
    if (isPostValid(content)) {
      const post = { id: uuidv4(), content, createdBy: user };
      if (postImage) {
        await firebaseService.upload({
          key: "posts",
          id: post.id,
          payload: postImage,
          entity: post,
          callback: onPostImageUploaded,
        });
      } else {
        await firebaseService.insert({
          key: "posts",
          id: post.id,
          payload: post,
        });
      }
      alert("Your post was uploaded successfully");
    }
    postContentRef.current.value = "";
    setPostImage(null);
  };

  const onPostImageUploaded = async (entity, url) => {
    entity.image = url;
    await firebaseService.insert({
      key: "posts",
      id: entity.id,
      payload: entity,
    });
  };

  const isPostValid = (content) => {
    if (validator.isEmpty(content)) {
      alert("Please input your post content");
      return false;
    }
    return true;
  };

  if (!user) return <></>;

  return (
    <div className="home">
      <div className="home__content">
        <div className="home__content-left"></div>
        <div className="home__content-middle">
          <div className="home__input-container">
            {postImage && (
              <div
                className="home__post-image"
                onClick={() => filepickerRef.current.click()}
              >
                <img src={postImage} alt="avatar" />
              </div>
            )}
            <div className="home__input-container-top">
              <img
                className="home__user-image"
                src={user.image}
                alt={user.email}
              />
              <input placeholder="Start a post" ref={postContentRef} />
            </div>
            <div className="home__input-container-bottom">
              <div
                onClick={() => filepickerRef.current.click()}
                className="home__button"
              >
                Photo
              </div>
              <input
                hidden
                onChange={uploadPostImage}
                ref={filepickerRef}
                type="file"
              />
              <div className="home__button" onClick={createPost}>
                Post
              </div>
            </div>
          </div>
          <div className="home__posts">
            {posts?.map((post) => (
              <div className="home__post" key={post.id}>
                <div className="home__author">
                  <img src={post.createdBy.image} alt="post-author" />
                  <p>{post.createdBy.fullname}</p>
                </div>
                <div className="home__post-content">{post.content}</div>
                {post?.image && (
                  <div className="home__post-image">
                    <img src={post.image} alt="post" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="home__content-right"></div>
      </div>
    </div>
  );
};

export default Home;