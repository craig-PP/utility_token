const { EmbedBuilder, Interaction } = require("discord.js");
const { Config } = require("./config");

let options = Config.getData().projectOptions;
let coin = options[0].coinName;
let botName = options[0].name;

const tokens = Config.getData().projectOptions[0].coinName;

function pogsChecked(
    pogCount,
    pogImg,
    yield
) {
    return new EmbedBuilder()
        .addFields(
            {
                name: "You have collected ",
                value: `${pogCount} ${coin}!`,
            },
            {
                name: "Your collection is currently earning you",
                value: `${yield} ${coin} per day`,
            }
        )
        .setImage(pogImg);
}


function helpMenu(userName, userAvatar) {
    let price = Config.getData().tokenClaim[0].price;
    return new EmbedBuilder()
        .setColor("#32a852")
        .setTitle("User Help Menu")
        .setAuthor({
            name: userName,
            iconURL: userAvatar,
        })
        .setDescription("Here are your available commands")
        .addFields(
            { name: "/register", value: "Register your wallet on our database" },
            {
                name: "/collection",
                value: `Checks how many guests and ${tokens} you have collected`,
            },
            { name: "/roles", value: "See role information" },
            {
                name: "/cointoss <heads/tails>",
                value: "Gamble 5 pogs to win 5...",
            },
            { name: `/${tokens}`, value: "See info on our Pog yields" },
            {
                name: `/${claimCommandName}`,
                value:
                    `Buy a ${collectionName} for ${price} ${tokens}, up to 4 may be purchased per person.\nYour purchase will be delivered as soon as possible to your wallet.`,
            }
        );
}

function getHelpAdmin(userName, userAvatar) {
    let price = Config.getData().tokenClaim[0].price;
    return new EmbedBuilder()
        .setColor("#32a852")
        .setTitle("Admin Help Menu")
        .setAuthor({
            name: userName,
            iconURL: userAvatar,
        })
        .setDescription("You need help?")
        .addFields(
            {
                name: "/checkuser <user id>",
                value: "ADMIN - Check if a user is registered on our database",
            },
            {
                name: "/delete <user id>",
                value: "ADMIN - Remove a user from the database",
            },
            {
                name: `/award <user id> <${tokens}>`,
                value: `ADMIN - Award ${tokens} to a user, remove with a minus number`,
            },
            {
                name: "/whois <discord id>",
                value: "ADMIN - check a username by discord ID",
            },
            { name: "/register", value: "Register your wallet" },
            {
                name: "/collection",
                value: `Checks how many guests and ${tokens} you have collected`,
            },
            { name: "/roles", value: "See role information" },
            { name: `/${tokens}`, value: "See info on our Pog yields" },
            {
                name: `/${claimCommandName}`,
                value:
                    `Buy a ${collectionName} for ${price} ${tokens}, up to 4 may be purchased per person.\nYour purchase will be delivered as soon as possible to your wallet.`,
            },
            {
                name: `/buyCustom`,
                value:
                    `Buy a Custom Guest for 500 ${tokens}, only one may be purchased per person.\nYour Guest will be customised after a chat with TheArtist.`,
            },
            {
                name: "/cointoss <heads/tails>",
                value: "Gamble 5 pogs to win 5...",
            }
        );
}

function rolesInfo(userName, userAvatar) {
    return new EmbedBuilder()
        .setColor("#0099ff")
        .setTitle("Roles")
        .setAuthor({
            name: userName,
            iconURL: userAvatar,

        })
        .setDescription("How do roles work?")
        .addFields(
            {
                name: "Roles are assigned based on how many Guests you hold",
                value: "Roles",
            },
            { name: "Guest", value: "0 Guests held", inline: true },
            { name: "Host", value: "1 or more Guests held", inline: true },
            { name: "Stargazer", value: "3 or more Guests held", inline: true },
            { name: "Voyager ", value: "5 or more Guests held", inline: true },
            { name: "Planeteer", value: "10 or more Guests held", inline: true },
            { name: "Celestial", value: "25 or more Guests held", inline: true }
        );
}

function tokensInfo(userName, userAvatar) {
    return new EmbedBuilder()
        .setColor("BLUE")
        .setTitle(`${tokens} Info`)

        .setAuthor({
            name: userName,
            iconURL: userAvatar,
        })
        .setDescription("What are the pog yields?")
        .addFields(
            {
                name: `${tokens} are awarded daily for each nft you hold from our sets`,
                value: "Awards ",
            },
            { name: "Guests", value: "7 per week", inline: true },
            { name: "EXTRAterrestrials", value: "6 per week", inline: true },
            { name: "Elderman", value: "5 per week", inline: true },
            { name: "Guest Hosts Parrots ", value: "5 per week", inline: true },
            { name: "Misfit Chimp Society", value: "5 per week", inline: true },
            { name: "Stacks Dads", value: "3 per week", inline: true },
            { name: "Lolas", value: "3 per week", inline: true }
        );
}

function floorEmbed(
    userName,
    userAvatar,
    guestFloorPrice,
    extrasFloorPrice,
    elderFloorPrice,
    dadsFloorPrice,
    lolasFloorPrice,
    parrotsFloorPrice,
    chimpsFloorPrice
) {
    return (
        new EmbedBuilder()
            .setColor("#14d106")
            .setTitle("Floor Prices")
            .setAuthor({
                name: userName,
                iconURL: userAvatar,
            })
            .setDescription("Latest floor prices for our collections")
            .addFields(
                {
                    name: "Guests " + guestFloorPrice + " STX",
                    value: "[Guests](https://gamma.io/collections/the-guests)",
                },
                {
                    name: "ExtraTerrestrials " + extrasFloorPrice + " STX",
                    value:
                        "[Extra Terrestrials](https://gamma.io/collections/the-guests-extraterrestrials)",
                },
                {
                    name: "Elderman " + elderFloorPrice + " STX",
                    value: "[Elderman](https://gamma.io/collections/the-guests-elderman)",
                },
                {
                    name: "Stacks Dads " + dadsFloorPrice + " STX",
                    value:
                        "[Stacks Dads](https://gamma.io/collections/the-guests-stacks-dads)",
                },
                {
                    name: "Lolas " + lolasFloorPrice + " STX",
                    value: "[Lolas](https://gamma.io/collections/the-lolas)",
                },
                {
                    name: "STX Parrots " + parrotsFloorPrice + " STX",
                    value: "[Guest Hosted STX Parrots](https://gamma.io/collections/guests-hosted-stacks-parrots)",
                },
                {
                    name: "Misfit Chimps " + chimpsFloorPrice + " STX",
                    value: "[Misfit Chimp Society](https://gamma.io/collections/misfit-chimp-society)",
                }
            )
    );
}

function updateAll(userName, userAvatar, count) {
    return new EmbedBuilder()
        .setColor("#0099ff")
        .setTitle("Update all user roles")
        .setAuthor({
            name: userName,
            iconURL: userAvatar,
        })
        .setDescription("User roles checked")
        .addFields({
            name: count + " registered users have been Guest Checked",
            value: "User roles updated",
        });
}

function userDeleted(userId, userName, userAvatar) {
    return new EmbedBuilder()
        .setColor("#0099ff")
        .setTitle("User deleted")
        .setAuthor({
            name: userName,
            iconURL: userAvatar,
        })
        .setDescription("User deleted")
        .addFields({ name: userId, value: " has been removed from the database" });
}

function generateRegistrationUrl(userId, userName, userAvatar) {
    const embed = new EmbedBuilder()
        .setColor("#0099ff")
        .setTitle("The Guests Registration")
        .setAuthor({
            name: userName,
            iconURL: userAvatar,
        })
        .setDescription("Registration for Guests and Authentication of Stx wallet!")
        .addFields({
            name: "Registration",
            value:
                "Please visit https://service-9598.something.gg/?authid=" +
                userId +
                "&avatar=" +
                userAvatar,
        });
    return embed;
}

function alreadyRegistered(userName, userAvatar) {
    const embed = new EmbedBuilder()
        .setColor("#0099ff")
        .setTitle("The Guests Registration")
        .setAuthor({
            name: `${botName}`,
            iconURL: "https://i.imgur.com/fK5nUpI.png",
        })
        .setDescription("Registration for Guests and Authentication of Stx wallet!")
        .addFields({
            name: "Registration",
            value: "You are already registered!",
        });
    return embed;
}

function tokenChange(userName, pogs, pogCount, memberName, reason, memberAvatar) {
    const embed = new EmbedBuilder()
        .setColor("#F1C40F")
        .setTitle(`${tokens} Recieved!`)
        .setAuthor({
            name: memberName,
            iconURL: memberAvatar,
        })
        .setDescription("Lucky you")
        .addFields({
            name:
                `${userName} awarded ${pogs} ${tokens} to ${memberName} ${reason}`,
            value: "New pog total: " + pogCount,
        });
    return embed;
}

function tokenRemove(userName, pogs, pogCount, memberName, reason, memberAvatar) {
    const embed = new EmbedBuilder()
        .setColor("#E74C3C")
        .setTitle(`${tokens} Abducted`)
        .setAuthor({
            name: memberName,
            iconURL: memberAvatar,
        })
        .setDescription("Oh dear")
        .addFields({
            name:
                `${userName} deducted ${pogs} ${tokens} from ${memberName} ${reason}`,
            value: "New pog total: " + pogCount,
        });
    return embed;
}

function userFound(userId, userName, userAvatar) {
    const embed = new EmbedBuilder()
        .setColor("#0099ff")
        .setTitle("Database Management")
        .setAuthor({
            name: userName,
            iconURL: userAvatar,
        })
        .setDescription("User Found")
        .addFields({
            name: "That user has been located on our database with the id:",
            value: userId,
        });
    return embed;
}

function userNotFound(userId, userName, userAvatar) {
    const embed = new EmbedBuilder()
        .setColor("#0099ff")
        .setTitle("Database Management")
        .setAuthor({
            name: userName,
            iconURL: userAvatar,
        })
        .setDescription("User Not Found")
        .addFields({
            name: "That user does not appear to be on our database",
            value: "Cannot locate user ID:" + userId,
        });
    return embed;
}

function notRegistered(userName, userAvatar) {
    const embed = new EmbedBuilder()
        .setColor("#0099ff")
        .setTitle(`Scanned Guests & ${tokens}`)
        .setAuthor({
            name: userName,
            iconURL: userAvatar,
        })
        .setDescription("User Not Found")
        .addFields({
            name: "You do not appear to be on our database",
            value: "Please use /register first and follow the instructions",
        });
    return embed;
}

function ticketsReceived(ticketCount, memberName, memberAvatar) {
    const embed = new EmbedBuilder()
        .setColor("#F1C40F")
        .setTitle("Tickets Received!")
        .setAuthor({
            name: memberName,
            iconURL: memberAvatar,
        })
        .setThumbnail("https://imgur.com/h1hTsOy.png")
        .setDescription("Raffle Entered!")
        .addFields({ name: memberName + ": " + ticketCount, value: "Good luck!" });
    return embed;
}

function ticketsTotal(ticketCount, memberName, memberAvatar) {
    const embed = new EmbedBuilder()
        .setColor("#F1C40F")
        .setTitle("Total Tickets")
        .setAuthor({
            name: memberName,
            iconURL: memberAvatar,
        })
        .setThumbnail("https://imgur.com/h1hTsOy.png")
        .setDescription("Your tickets")
        .addFields({
            name: memberName + " you currently hold " + ticketCount + " tickets",
            value: "Good luck!",
        });
    return embed;
}

function noTicketsTotal(tickets, memberName, memberAvatar) {
    const embed = new EmbedBuilder()
        .setColor("#f00000")
        .setTitle("Total Tickets")
        .setAuthor({
            name: memberName,
            iconURL: memberAvatar,
        })
        .setThumbnail("https://imgur.com/h1hTsOy.png")
        .setDescription("No tickets")
        .addFields({
            name: memberName + " you currently hold " + tickets + " tickets",
            value: "Use /buytickets to enter",
        });
    return embed;
}

function noTickets(memberName, memberAvatar) {
    const embed = new EmbedBuilder()
        .setColor("#f00000")
        .setTitle("Raffle Tickets")
        .setAuthor({
            name: memberName,
            iconURL: memberAvatar,
        })
        .setThumbnail("https://imgur.com/h1hTsOy.png")
        .setDescription(`Not enough ${tokens}`)
        .addFields({
            name:
                "Sorry " + memberName + ", your Pog game is too weak for that purchase",
            value: "Do not fear, you will have more tomorrow!",
        });
    return embed;
}

function totalTickets(chance, totalTickets, tickets, memberName, memberAvatar) {
    const embed = new EmbedBuilder()
        .setColor("#F1C40F")
        .setTitle("Raffle Information")
        .setAuthor({
            name: memberName,
            iconURL: memberAvatar,
        })
        .setThumbnail("https://imgur.com/h1hTsOy.png")
        .setDescription("Golden Guest Raffle")
        .addFields({
            name: `1 winner will receive the Golden Guest, the winner will be drawn on July 30th\n\nTickets cost 5 ${tokens} each.`,
            value:
                "We have currently sold " +
                totalTickets +
                " tickets\n\nYou have " +
                tickets +
                " tickets which gives you a " +
                chance +
                "% chance of winning!",
        })
        .setImage("https://i.imgur.com/A9p7vux.png");
    return embed;
}

function purchaseCustomGuest(memberName, memberAvatar) {
    const embed = new EmbedBuilder()
        .setColor("#ffb300")
        .setTitle("Custom Guest Claim")
        .setAuthor({
            name: memberName,
            iconURL: memberAvatar,
        })
        .setThumbnail("https://imgur.com/dlonn2z.png")
        .setDescription("Confirmation")
        .addFields({
            name: `${memberName}, you have successfully claimed a custom Guest `,
            value: "The Artist will contact you shortly to discuss your custom Guest",
        });
    return embed;
}

function tokenClaims(memberName, memberAvatar, claimAmount) {
    let guestC = '';
    if (claimAmount === '1') {
        guestC = 'Woymul';
    } else {
        guestC = 'Woymuls';
    }
    const embed = new EmbedBuilder()
        .setColor("#ffb300")
        .setTitle(`${collectionName} Claim`)
        .setAuthor({
            name: memberName,
            iconURL: memberAvatar,
        })
        .setThumbnail(claimThumbnail)
        .setDescription("Confirmation")
        .addFields({
            name: `${memberName}, you have successfully claimed ${claimAmount} ${guestC} from ${collectionName} `,
            value: `Your ${collectionName} will be airdropped to your wallet when ready`,
        });
    return embed;
}

function customNotEnoughTokens(memberName, memberAvatar) {
    const embed = new EmbedBuilder()
        .setColor("#f00000")
        .setTitle("Custom Guest Claim")
        .setAuthor({
            name: memberName,
            iconURL: memberAvatar,
        })
        .setThumbnail("https://imgur.com/dlonn2z.png")
        .setDescription("Pog game is weak")
        .addFields({
            name: `${memberName}, you need 500 ${tokens} to claim a custom guest `,
            value: `Keep going, your guests are earning ${tokens} daily!`,
        });
    return embed;
}

function tokenClaimNotEnoughTokens(memberName, memberAvatar, claimAmount) {
    let price = Config.getData().tokenClaim[0].price;
    let guestC = 'Woymul';
    if (claimAmount === '1') {
        price = price * claimAmount;
        guestC = guestC;
    } else {
        price = price * claimAmount;
        guestC = guestC + 's';
    }
    const embed = new EmbedBuilder()
        .setColor("#f00000")
        .setTitle(`${collectionName} Claim`)
        .setAuthor({
            name: memberName,
            iconURL: memberAvatar,
        })
        .setThumbnail(claimThumbnail)
        .setDescription("Pog game is weak")
        .addFields({
            name: `${memberName}, you need ${price} ${tokens} to claim ${claimAmount} ${guestC} from ${collectionName} `,
            value: `Keep going, your guests are earning ${tokens} daily!`,
        });
    return embed;
}

function customOwnedAlready(memberName, memberAvatar) {
    const embed = new EmbedBuilder()
        .setColor("#f00000")
        .setTitle("Custom Guest Claim")
        .setAuthor({
            name: memberName,
            iconURL: memberAvatar,
        })
        .setThumbnail("https://imgur.com/dlonn2z.png")
        .setDescription("Don't be greedy!")
        .addFields({
            name: `${memberName}, custom guests are restricted to 1 per person `,
            value: `We have more ways to spend your ${tokens} coming soon!`,
        });
    return embed;
}

function tokenClaimOwnedAlready(memberName, memberAvatar) {
    const embed = new EmbedBuilder()
        .setColor("#f00000")
        .setTitle(`${collectionName} Claim`)
        .setAuthor({
            name: memberName,
            iconURL: memberAvatar,
        })
        .setThumbnail(claimThumbnail)
        .setDescription("Don't be greedy!")
        .addFields({
            name: `${memberName}, ${collectionName}'s are restricted to ${maxClaim} per person `,
            value: `We have more ways to spend your ${tokens} coming soon!`,
        });
    return embed;
}

function tokenClaimSoldOut(memberName, memberAvatar) {
    const embed = new EmbedBuilder()
        .setColor("#f00000")
        .setTitle(`${collectionName} Claim`)
        .setAuthor({
            name: memberName,
            iconURL: memberAvatar,

        })
        .setThumbnail(claimThumbnail)
        .setDescription("Sold Out!")
        .addFields({
            name: `${memberName}, ${collectionName}'s are now sold out`,
            value: `We have more ways to spend your ${tokens} coming soon!`,
        });
    return embed;
}


function notLive(userName, userAvatar) {
    return new EmbedBuilder()
        .setColor("#f00000")
        .setTitle("Command disabled")
        .setAuthor({
            name: userName,
            iconURL: userAvatar,

        })
        .setDescription("The devs have turned this off")
        .addFields(
            { name: "The current claim has ended", value: "New claim coming soon" },
        );
}


function customNotLive(userName, userAvatar) {
    return new EmbedBuilder()
        .setColor("#f00000")
        .setTitle("Command disabled")
        .setAuthor({
            name: userName,
            iconURL: userAvatar,

        })
        .setDescription("The devs have turned this off")
        .addFields(
            { name: "The custom guest claim has ended", value: "New claim coming soon" },
        );
}


function welcome(member, memberName, memberAvatar, welcomeImage) {
    return new EmbedBuilder()
        .setColor("#0099ff")
        .setTitle("New Member")
        .setAuthor({
            name: memberName,
            iconURL: memberAvatar,

        })
        .addFields(
            { name: `Wecome to The Guests `, value: `${member}` },
        )
        .setImage(welcomeImage);
}

function coinToss(embedColor, userName, userAvatar, call, hollyCall, result, totalGames, totalGameWins, totalGameLoss, gains, callImage, tokenCount) {
    return new EmbedBuilder()
        .setColor(`${embedColor}`)
        .setTitle("Coin Toss")
        .setAuthor({
            name: userName,
            iconURL: userAvatar,
        })
        .setDescription(`You ${result}`)
        .addFields(
            { name: `You called ${call}`, value: `Holly tossed ${hollyCall}` },
            { name: `You ${result}`, value: `5 pogs` },
            { name: `Your new pog total`, value: `${tokenCount} pogs` },
            { name: `You have played coin toss`, value: ` ${totalGames} times` },
            { name: `You have won`, value: ` ${totalGameWins} times` },
            { name: `You have lost`, value: ` ${totalGameLoss} times` },
            { name: `Total pogs won/lost to date`, value: ` ${gains} pogs` },
        )
        .setThumbnail(callImage);
}

function coinStats(gamesPlayed, pogsBet, playerPosition, pogsWon, hollyPosition, pogsLost, biggestMember, mostGames, highestMember, mostPogsWon, lowestMember, mostPogsLost) {
    return new EmbedBuilder()
        .setColor(`#42f54b`)
        .setTitle("Cointoss")
        .setDescription(`Current cointoss statistics`)
        .addFields(
            { name: `Total games of cointoss played to date:`, value: `${gamesPlayed} games` },
            { name: `Total pogs bet on cointoss to date:`, value: `${pogsBet} pogs` },
            { name: `Players are ${playerPosition}`, value: `${pogsWon} pogs to date` },
            { name: `Holly is ${hollyPosition}`, value: `${pogsLost} pogs to date` },
            { name: `The most games played is:`, value: ` ${mostGames} by ${biggestMember}` },
            { name: `The highest roller:`, value: ` ${highestMember} winning ${mostPogsWon} pogs` },
            { name: `The biggest loser:`, value: ` ${lowestMember} losing ${mostPogsLost} pogs` },
        )
}


// sends the functions/messages for use from another file
module.exports = {
    pogsChecked,
    helpMenu,
    getHelpAdmin,
    rolesInfo,
    floorEmbed,
    userDeleted,
    generateRegistrationUrl,
    alreadyRegistered,
    tokenChange,
    tokenRemove,
    userFound,
    userNotFound,
    notRegistered,
    ticketsReceived,
    noTickets,
    ticketsTotal,
    noTicketsTotal,
    totalTickets,
    updateAll,
    purchaseCustomGuest,
    customNotEnoughTokens,
    customOwnedAlready,
    tokensInfo,
    tokenClaims,
    tokenClaimNotEnoughTokens,
    tokenClaimOwnedAlready,
    notLive,
    customNotLive,
    welcome,
    tokenClaimSoldOut,
    coinToss,
    coinStats,
};
