// import all actions
const {
  CREATE_ROOM,
  JOIN_ROOM,
  CREATE_TEAM,
  JOIN_TEAM,
  START_COMPETITION,
} = require("../socketActions/userActions");
const {
  CONNECTION_ACK,
  CONNECTION_DENY,
} = require("../socketActions/serverActions");

//import controllers
const { addUser, removeUser } = require("../controllers/userController");
const {
  createRoom,
  createTeam,
  joinTeam,
  joinRoom,
  getRoomData,
  roomEligible,
} = require("../controllers/roomController");

// import utils
const { getQuestions } = require("../utils/qapiConn");

const checkToken = (token) => {
  //just for testing will change later
  if (token[0] !== "z") {
    return {
      userName: token,
    };
  } else {
    false;
  }
};

const authUser = (socket, next) => {
  try {
    // check the token
    // token format "Bearer Token"
    const token = socket.handshake.headers.authorization.split(" ")[1];
    const payload = checkToken(token);

    //if sucessfull
    if (payload) {
      // connection accepted
      // now check if user is already connected or not
      if (addUser(payload.userName, socket.id)) {
        socket.emit(CONNECTION_ACK);
        socket.userDetails = payload;
        next();
      } else {
        throw new Error("Already Conected");
      }
    } else {
      console.log("Invalid token");
      socket.emit(CONNECTION_DENY);
      throw new Error("Auth failed");
    }
  } catch (err) {
    socket.emit();
    next(err);
  }
};

const genericActionCreater = (
  actionResponder,
  userDetails,
  failReply = "Some error occured !",
  ACTION = ""
) => (config, cb) => {
  // only passes userName
  config.userName = userDetails.userName;
  let data = actionResponder(config) || failReply;
  if (data) {
    console.log(`${ACTION} succesfull !`);
  }
  console.log(data);
  cb(data);
};

const handleUserEvents = (socket) => {
  // auth middle ware will set this based on jwt payload
  // ideal
  // socket.on(
  //   CREATE_ROOM,
  //   genericActionCreater(
  //     createRoom,
  //     getRoomData,
  //     "Could'nt create room !",
  //     CREATE_ROOM
  //   )
  // );
  // but below approach is shorter
  socket.on(CREATE_ROOM, genericActionCreater(createRoom, socket.userDetails));
  socket.on(JOIN_ROOM, genericActionCreater(joinRoom, socket.userDetails));
  socket.on(CREATE_TEAM, genericActionCreater(createTeam, socket.userDetails));
  socket.on(JOIN_TEAM, genericActionCreater(joinTeam, socket.userDetails));

  // admin wants to start the competition
  socket.on(START_COMPETITION, async (dataFromClient, cb) => {
    // check if room is eligible
    let { userDetails } = socket;
    // user is allowed to start, and room meets requirement
    let eligibleRoom = roomEligible(userDetails.userName);
    if (eligibleRoom) {
      // add event listeners and remove for veto

      // start question selection
      // get numberOfTeams+numberQuestion ques from api
      // start selection process

      let allQuestions = await getQuestions();

      // veto process
      let selectedQuestions = await setQuestions(allQuestions);
      // end of selection

      // add event listeners for code submit
      // this is just prototype
      socket.on("CODE_SUBMIT", ({ code, lang }, cb) => {
        // call codeExec api
        //wait for result
        // check output
        // send back result in cb
        // update score based on result
        // call other events if required
      });
    }
  });

  socket.on("disconnect", () => {
    removeUser(socket.userDetails.userName);
  });
};

const setQuestions = async () => {
  // veto proceess here
};

module.exports = {
  authUser,
  handleUserEvents,
};
