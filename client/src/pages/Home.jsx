import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HomeCard from '../compenents/HomeCard'
import { getPostsAction } from '../redux/actions/post';

const Home = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostsAction());
  },[]);
  
  const {posts} = useSelector(state => state.posts);

  //console.log("consolo post",postss)

  return (
    <div className='flex items-center m-5 flex-wrap'>
    {
      posts?.map((post,i) => (
        <HomeCard key={i} post={post}/>
      ))
    }
    </div>
  )
}

export default Home