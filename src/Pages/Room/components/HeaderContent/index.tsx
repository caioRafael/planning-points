import { FC, useEffect, useState } from "react";
import { ChangeButton, PrimaryButton } from "../../../../components";
import Dropdown, { DropdownItem } from "../../../../components/Dropdown";
import { useRoom } from "../../../../hooks/useRoom";
import decimal from "../../../../utils/decimal";
import fibonacci from "../../../../utils/fibonacci";
import { Container, RoomCode } from "./styles";
import { useParams } from 'react-router-dom';
import { useRoomVote } from './../../../../hooks/useRoomVote';
import { FiCopy } from 'react-icons/fi'

interface HeaderContentProps {
    setList: (list: number[]) => void
}

const HeaderContent: FC<HeaderContentProps> = (props) => {
    const { setList } = props
    const { code } = useParams()
    const { room, users } = useRoom(code as string)
    const { setVisibleVote, resetVotes } = useRoomVote()

    const [item, setItem] = useState<DropdownItem>(
        {
            name: 'Fibonacci',
            value: 1
        }
    )

    useEffect(() => {
        if (item.value === 1) {
            setList(fibonacci())
        } else if (item.value === 2) {
            setList(decimal())
        }
    }, [item])

    function copyRoomCode() {
        navigator.clipboard.writeText(code as string)
    }

    return (
        <Container>
            <section>
                <PrimaryButton
                    width={100}
                    text={room?.result_reveled ? "Ocultar" : "Revelar"}
                    onClick={() => setVisibleVote(code as string, room?.result_reveled as boolean)}
                />
                <ChangeButton
                    width={100}
                    text="Reset"
                    onClick={() => resetVotes(code as string, users)}
                    disabled={!room?.result_reveled}
                />
            </section>

            <RoomCode
                onClick={copyRoomCode}
            >
                <FiCopy size={20} />
                {code}
            </RoomCode>

            <Dropdown
                list={ListItems}
                item={item}
                setItem={setItem}
            />
        </Container>
    );
}

export default HeaderContent;

const ListItems: DropdownItem[] = [
    {
        name: 'Fibonacci',
        value: 1
    },
    {
        name: 'Decimal',
        value: 2
    }
]