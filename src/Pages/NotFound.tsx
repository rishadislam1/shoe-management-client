import { Link } from 'react-router-dom';
import notFound from '../assets/notFound/Frame.png';

const NotFound = () => {
    return (
        <div className='flex flex-col justify-center items-center'>
            <h1 className='my-10 font-bold text-5xl'>Your Page Is Not Found.</h1>
            <img src={notFound} alt="" />
            <Link to='/'><button className='my-20 bg-red-400 py-3 px-5 rounded-xl text-white font-bold text-xl'>Go Back Home</button></Link>
        </div>
    );
};

export default NotFound;