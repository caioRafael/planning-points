import { SignOut } from "phosphor-react"
import { FC, useContext } from "react"
import { ThemeContext } from "styled-components"
import { User } from "../../context/AuthContext"
import Image from "../Image"
import { HeaderContainer, HeaderStyles, IconButton, LogoHeader, UserContent } from "./styles"
import Logo from '../../assets/logo.svg'

interface HeaderProps {
  user: User | null
  onSignOut: () => void
}

const Header: FC<HeaderProps> = ({ user, onSignOut }) => {
  const { colors } = useContext(ThemeContext)

  return (
    <HeaderStyles>
      <HeaderContainer>
        <LogoHeader src={Logo}/>
        {/* <span>Poti<b>Points</b></span> */}
        {user && (
          <UserContent>
            <Image url={user.avatar} name={user.name} />
            <p>{user.name}</p>
            <IconButton onClick={onSignOut}>
              <SignOut size={24} color={colors.primary} />
            </IconButton>
          </UserContent>
        )}
      </HeaderContainer>
    </HeaderStyles>
  )
}

export default Header