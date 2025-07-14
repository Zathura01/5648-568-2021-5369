const Saving = require('../../../models/accounting/transactions/Saving');
const SavingdashSchema = require('../../../models/accounting/dashboard/Savingdash');
const getObjectId = require('./GetObjectId');

// Balance check function
const checkBalance = (curramt, amt) => {
  return (curramt + amt) > 0;
};

// Function to save individual saving entry
const saveintoSaveTable = async ({ userId, category, amount, comment }) => {
  const dataToSend = {
    userId,
    category,
    amount,
    comment
  };

  const saveNewSave = new Saving(dataToSend);
  await saveNewSave.save();
  return saveNewSave;
};

// Main saving service
const Saveservice = async ({ userId, category, amount, comment }) => {
  const validCategories = ['SBI', 'AXIS', 'IDBI', 'MISC'];
  if (!validCategories.includes(category)) {
    return { msg: "Invalid Category", saveId: null, flag: false };
  }

  try {
    const objectUserId = getObjectId(userId);
    let existSaveDash = await SavingdashSchema.findOne({ userId: objectUserId });

    if (!existSaveDash) {
      // Create new dashboard
      const newSaveDashEntry = new SavingdashSchema({
        userId: objectUserId,
        SBI: 0,
        AXIS: 0,
        IDBI: 0,
        MISC: 0,
        TOTAL: 0
      });

      if (!checkBalance(newSaveDashEntry[category], amount)) {
        return { msg: "Not Enough Balance", saveId: null, flag: false };
      }

      newSaveDashEntry[category] = amount;
      newSaveDashEntry.TOTAL = amount;
      await newSaveDashEntry.save();

      const saveNewSave = await saveintoSaveTable({ userId: objectUserId, category, amount, comment });

      return { msg: "New Dashboard Entry updated", saveId: saveNewSave._id, flag: true };

    } else {
      // Update existing dashboard
      if (!checkBalance(existSaveDash[category], amount)) {
        return { msg: "Not Enough Balance", saveId: null, flag: false };
      }

      existSaveDash[category] += amount;
      existSaveDash.TOTAL += amount;
      await existSaveDash.save();

      const saveNewSave = await saveintoSaveTable({ userId: objectUserId, category, amount, comment });

      return { msg: "Dashboard Save Entry updated", saveId: saveNewSave._id, flag: true };
    }

  } catch (err) {
    console.error("Saveservice error:", err);
    return { msg: "Server Error", saveId: null, flag: false };
  }
};

module.exports = Saveservice;
