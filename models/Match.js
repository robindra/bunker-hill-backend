const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
    date: {
        type: String,
        require: [true, 'Please select the date']
    },
    time: {
        start: {
            type: String,
            require: true,
        },
        end: {
            type: String,
            require: true
        }
    },
    venue: {
        type: String,
        require: [true, 'Please select the venue']
    },
    teams: {
        team1: {
            type: mongoose.Schema.ObjectId,
            ref: 'Team'
        },
        team2: {
            type: mongoose.Schema.ObjectId,
            ref: 'Team'
        }
    },
    pdp: {
        punctuality: {
            team1: {
                type: Number,
                require: true,
                default: 0
            },
            team2: {
                type: Number,
                require: true,
                default: 0
            }
        },
        goals: {
            team1: {
                type: Number,
                require: true,
                default: 0
            },
            team2: {
                type: Number,
                require: true,
                default: 0
            }
        },
        greenCard: {
            team1: {
                type: Number,
                require: true,
                default: 0
            },
            team2: {
                type: Number,
                require: true,
                default: 0
            }
        }
    },
    coc: {
        players: {
            team1: {
                type: Number,
                require: true,
                default: 3
            },
            team2: {
                type: Number,
                require: true,
                default: 3
            }
        },
        coaches: {
            team1: {
                type: Number,
                require: true,
                default: 3
            },
            team2: {
                type: Number,
                require: true,
                default: 0
            }
        },
        parents: {
            team1: {
                type: Number,
                require: true,
                default: 3
            },
            team2: {
                type: Number,
                require: true,
                default: 3
            }
        }
    }, 
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category'
    },
    played: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date, 
        default: Date.now
    },
    upatedAt: {
        type: Date, 
        default: Date.now
    }
});

module.exports = mongoose.model('Match', MatchSchema);