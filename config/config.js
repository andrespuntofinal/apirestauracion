module.exports = {
   


    firebase: {

        type: "service_account",
        project_id: process.env.PROJECT_ID,
        private_key_id: process.env.PRIVATE_KEY_ID,
        client_email: process.env.CLIENT_EMAIL

    }


};