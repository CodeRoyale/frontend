"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../utils/constants");
const uuid_1 = require("uuid");
const createRoom = async (createRoomInput, currentUserId, redis) => {
    const roomCode = (0, uuid_1.v4)();
    try {
        const room = await redis.get(constants_1.ROOM_PREFIX + roomCode);
        if (room) {
            return {
                status: 0,
                error: "There is already a room present by the code given",
            };
        }
        const newRoom = {
            config: {
                roomCode: roomCode,
                adminUserId: currentUserId,
                maxTeams: createRoomInput.config.maxTeams,
                maxMembersPerTeam: createRoomInput.config.maxMembersPerTeam,
                maxMembers: createRoomInput.config.maxMembers,
            },
            state: {
                currMemberCount: 1,
                bannedMemberIds: [],
                bench: [currentUserId],
            },
            competition: {
                questionIds: [],
                maxQuestions: createRoomInput.competition.maxQuestions,
                contestStartedAt: null,
                contestEndedAt: null,
                isCompOn: false,
                timeLimit: createRoomInput.competition.timeLimit,
                veto: {
                    questionCount: createRoomInput.veto.questionCount,
                    questionIds: [],
                    maxVoteAllowed: createRoomInput.veto.maxVoteAllowed,
                    isVetoOn: false,
                    timeLimit: createRoomInput.veto.timeLimit,
                    votedUserIds: [],
                },
            },
        };
        await redis.set(constants_1.ROOM_PREFIX + roomCode, JSON.stringify(newRoom));
        return { status: 1, data: newRoom };
    }
    catch (error) {
        console.log(error);
        return { status: 0, error: error.message };
    }
};
exports.default = { createRoom };
//# sourceMappingURL=room.js.map