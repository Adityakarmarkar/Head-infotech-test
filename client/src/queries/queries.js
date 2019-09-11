import { gql } from 'apollo-boost';

const getBooksQuery = gql`
    {
        findAllplayer {
            name
            gender
            id
            team
        }
    }
`;
const getPlayerDetails = gql`
    query player($id: ID){
        player(id: $id) {
            id
            name
            gender
            team
            innings{
              id
              score
              wickets
              dots
              centuries
              fifties
              mom
              type
            }
        }
    }
`;



// export { getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery };
export {getBooksQuery, getPlayerDetails};
