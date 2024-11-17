import { Link, useParams } from 'react-router-dom';
import BackButton from '../components/back-button';

export default function PreviewTipDetails() {
  const { userName } = useParams();

  return (
    <main className="px-4 py-10 pb-10 bg-primaryDark/20">
      <div>
        <div className='flex items-center mb-5'>
          <BackButton />
          <h3 className='text-center w-full'>Tip a Friend</h3>
        </div>
        <div className='h-screen flex flex-col justify-between'>
          <div className='space-y-4'>
            <div>
              <img src="" alt="" className="flex items-center justify-center w-full h-48 bg-white/30 border border-dashed border-gray-400 rounded-lg cursor-pointer" />
              <h1 className='text-center mt-2 font-semibold'>{userName}'s Pocket</h1>
            </div>
          </div>
          <div className='w-full'>
            {
              userName &&
              <Link
                to={`/app/pocket/tip/${userName}/send-tip`}
              >
                <button className="font-orbitron w-full px-4 py-2 text-white rounded-md bg-primaryDark">
                  Next
                </button>
              </Link>
            }
          </div>
        </div>
      </div>
    </main>
  )
}



