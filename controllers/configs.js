exports.getConfiguration = async (req, res, next) => {
    const baseURL = "http://localhost:5001";
    const configuration = {
        CATEGORY: `${baseURL}/api/v1/category`,
        MATCH: `${baseURL}/api/v1/match`,
        PLAYERS: `${baseURL}/api/v1/players`,
        TEAMS: `${baseURL}/api/v1/team`,
        USER: `${baseURL}/api/v1/user`
    }
    res.status('200').json({
        success: true,
        data: [configuration]
    });
}