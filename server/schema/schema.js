const graphql = require('graphql');
const Players = require('../models/player');
const Innings = require('../models/innings');

const { GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLNonNull
} = graphql;


const PlayerType = new GraphQLObjectType({
    name: 'Players',
    fields: ( ) => ({
        id    : { type: GraphQLID },
        name  : { type: GraphQLString },
        gender: { type: GraphQLString },
        team  : { type: GraphQLString },
        innings : {
            type: new GraphQLList(InningsType),
            resolve(parent, args){
                return Innings.find({playerID : parent.id});
            }
        }
    })
});

const InningsType = new GraphQLObjectType({
    name: 'Innings',
    fields: ( ) => ({
        id        : { type: GraphQLID },
        score     : { type: GraphQLInt },
        wickets   : { type: GraphQLInt },
        dots      : { type: GraphQLInt },
        centuries : { type: GraphQLBoolean },
        fifties   : { type: GraphQLBoolean },
        mom       : { type: GraphQLBoolean },
        type      : { type: GraphQLString },
        playerID  : {
            type: PlayerType,
            resolve(parent, args){
                return Players.findById(parent.playerID);
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: ()=> ({
        player: {
            type: PlayerType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
              console.log('args', args)
                return Players.findById(args.id);
            }
        },
        findAllplayer: {
            type: new GraphQLList(PlayerType),
            resolve(parent, args){
                return Players.find({});
            }
        },
        // getInnings: {
        //     type: new GraphQLList(InningsType),
        //     args: { id: { type: GraphQLID } },
        //     resolve(parent, args){
        //       console.log('args', args)
        //         return Innings.findById(args.id);
        //     }
        // },
    }),

});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addPlayers: {
            type: PlayerType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                gender: { type: new GraphQLNonNull(GraphQLString) },
                team: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args){
                let player = new Players({
                    name: args.name,
                    gender: args.gender,
                    team: args.team
                });
                return player.save();
            }
        },
        addInnings: {
            type: InningsType,
            args: {
              score     : { type: new GraphQLNonNull(GraphQLString) },
              wickets   : { type: new GraphQLNonNull(GraphQLString) },
              dots      : { type: new GraphQLNonNull(GraphQLString) },
              centuries : { type: new GraphQLNonNull(GraphQLString) },
              fifties   : { type: new GraphQLNonNull(GraphQLString) },
              mom       : { type: new GraphQLNonNull(GraphQLString) },
              type      : { type: new GraphQLNonNull(GraphQLString) },
              playerID  : { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args){
                let innings = new Innings({
                    score: args.score,
                    wickets: args.wickets,
                    dots: args.dots,
                    centuries: args.centuries,
                    fifties: args.fifties,
                    mom: args.mom,
                    type: args.type,
                    playerID: args.playerID
                });
                return innings.save();
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
