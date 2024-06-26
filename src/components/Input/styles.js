import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;

    width: 100%;
    border-radius: 5px;

    color: ${({ theme }) => theme.COLORS.LIGHT_GRAY_200};
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_500};

    input {
        width: 100%;
        height: 4.8rem;

        padding: 1.6rem 1.4rem;
        border: 1px solid ${({ theme }) => theme.COLORS.WHITE};
        border-radius: 0.5rem;

        color: ${({ theme }) => theme.COLORS.LIGHT_GRAY_200};
        background: transparent;

        &:placeholder {
            color: ${({ theme }) => theme.COLORS.LIGHT_GRAY_200};
        }
    }
    
    > svg {
        margin-left: 1.4rem;
    }
`;