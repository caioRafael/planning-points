import { Container, Division, GoogleButton, InputRoomCode } from './styles';
import { FcGoogle } from 'react-icons/fc'
import { useCallback, useState, FormEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../components';
import { signInGoogle } from '../../service/auth';
import { AuthGoogleContext } from '../../contexts/auth';


function NewRoom() {
  const navigate = useNavigate()
  const { handleSignIn } = useContext(AuthGoogleContext);

  const [code, setCode] = useState<string>()

  const enterRoom = useCallback((event: FormEvent) => {
    event.preventDefault()
    navigate(`/room/${code}`)
  }, [code])

  return (
    <Container>
      <h1>Apontamentos</h1>
      <GoogleButton
        onClick={handleSignIn}
      >
        <FcGoogle size={25} />
        Crie um sala com sua conta Google
      </GoogleButton>

      <Division>
        Ou entre em uma sala
      </Division>

      <form onSubmit={enterRoom}>
        <InputRoomCode
          placeholder='Código da sala'
          onChange={e => setCode(e.target.value)}
        />
        <PrimaryButton
          text='Entrar na sala'
          type='submit'
        />
      </form>
    </Container>
  );
}

export default NewRoom;