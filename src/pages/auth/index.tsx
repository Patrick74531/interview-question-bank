import Login from '../../components/Auth/Login'
import Signup from '../../components/Auth/Signup'

export default function Auth() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <Login />
      <Signup />
    </div>
  )
}
