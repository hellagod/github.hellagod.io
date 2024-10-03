import {players} from "../utils/utils";

let plList = Object.values(players)
let scores = plList.map(p => p.score)
export const distributionInit = {
    playersList: plList,
    teams: [
        {name: 'Command 1', mask: [null, null, null, null, null]},
        {name: 'Command 2', mask: [null, null, null, null, null]},
        {name: 'Command 3', mask: [null, null, null, null, null]},
        {name: 'Command 4', mask: [null, null, null, null, null]},
        {name: 'Command 5', mask: [null, null, null, null, null]},
    ],
    filter: {
        pos: [],
        text: ""
    },
    stats: {
        minMmr: Math.min(...scores),
        maxMmr: Math.max(...scores),
        currentLowMmr: Math.min(...scores),
        currentHighMmr: Math.max(...scores),
    }

};

export const distributionReducer = (state, action) => {
    let playerId, teams, teamId, pos, playersList, scores, minMmr, maxMmr;
    switch (action.type) {
        case 'back_to_list':
            playerId = action.playerId
            teams = structuredClone(state.teams)
            for (let team of teams)
                for (let i = 0; i < team.mask.length; i++)
                    if (team.mask[i] && team.mask[i].id === playerId)
                        team.mask[i] = null
            playersList = state.playersList.map(p => ({...p}))
            playersList.push(players[playerId])
            scores = playersList.map(p => p.score)
            maxMmr = Math.max(...scores)
            minMmr = Math.min(...scores)
            return {
                ...state,
                playersList,
                teams,
                stats: {
                    ...state.stats,
                    currentLowMmr: Math.max(minMmr, state.stats.currentLowMmr),
                    currentHighMmr: Math.min(maxMmr, state.stats.currentHighMmr),
                    minMmr,
                    maxMmr
                }
            };
        case 'to_team':
            playerId = action.playerId
            teamId = action.teamId
            pos = action.pos
            teams = structuredClone(state.teams)
            playersList = state.playersList.filter(p => p.id !== playerId).map(p => ({...p}))
            let lastPlace = 'list'
            for (let j = 0; j < teams.length; j++)
                for (let i = 0; i < teams[j].mask.length; i++)
                    if (teams[j].mask[i] && teams[j].mask[i].id === playerId) {
                        lastPlace = [j, i]
                        teams[j].mask[i] = null
                    }
            if (teams[teamId].mask[pos]) {
                if (lastPlace === 'list')
                    playersList.push(teams[teamId].mask[pos])
                else {
                    teams[lastPlace[0]].mask[lastPlace[1]] = teams[teamId].mask[pos]
                }
            }
            teams[teamId].mask[pos] = players[playerId]
            scores = playersList.map(p => p.score)
            maxMmr = Math.max(...scores)
            minMmr = Math.min(...scores)
            return {
                ...state,
                playersList,
                teams,
                stats: {
                    ...state.stats,
                    currentLowMmr: Math.max(minMmr, state.stats.currentLowMmr),
                    currentHighMmr: Math.min(maxMmr, state.stats.currentHighMmr),
                    minMmr,
                    maxMmr
                }
            };
        case 'filter_text':
            return {
                ...state,
                filter: {
                    ...state.filter,
                    text: action.value
                }
            }
        case 'filter_pos':
            return {
                ...state,
                filter: {
                    ...state.filter,
                    pos: action.mask.map((v, index) => [v, index]).filter(([v]) => v).map(([v, index]) => index+1)
                }
            }
        case 'filter_mmr':
            return {
                ...state,
                stats: {
                    ...state.stats,
                    currentLowMmr: action.min,
                    currentHighMmr: action.max
                }
            }

        default:
            return state
    }
};