import styled from 'styled-components'

export const Container = styled.div`
    height: calc(100vh - 56px);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    video,
    img {
        border-radius: 8px;
        margin-bottom: 10px;
        width: 100%;
    }

    .footer {
        display: flex;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .card-title {
        text-align: center;
    }
`
