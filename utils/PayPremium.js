const Vereinsmitglied = require('./../models/Vereinsmitglied');

async function sInterval() {
    await setInterval(async function () {
        const allMembers = await Vereinsmitglied.find();
        const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
        const now = new Date();
        (await allMembers).map(async (item) => {
            if (!item.lastPayedDay) {
                await Vereinsmitglied.findByIdAndUpdate(item._id, { hasPremium: false })
                return
            }
            let timeDiffInMS = now.getTime() - item.lastPayedDay;
            if (timeDiffInMS >= thirtyDaysInMs) {
                await Vereinsmitglied.findByIdAndUpdate(item._id, { hasPremium: false })
            }
            else {
                await Vereinsmitglied.findByIdAndUpdate(item._id, { hasPremium: true })
            }
        })
        console.log("checked for Premium")
    }, 1147483647);

};






sInterval()