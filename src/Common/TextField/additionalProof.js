export const additionalProof = (inputs, value) => {
  let UpdatedInput = [];
  if (value === "Pan") {
    UpdatedInput = inputs.map((item, i) => {
      if (item.isname == "panNumber" || item.isname == "panPhoto") {
        return {
          ...item,
          NotShow: false,
        };
      }
      if (item.isname == "voterIdNumber" || item.isname == "voterIdPhoto") {
        return {
          ...item,
          NotShow: true,
        };
      }
      return item;
    });
  } else if (value === "Voter Id") {
    UpdatedInput = inputs.map((item, i) => {
      if (item.isname == "voterIdNumber" || item.isname == "voterIdPhoto") {
        return {
          ...item,
          NotShow: false,
        };
      }
      if (item.isname == "panNumber" || item.isname == "panPhoto") {
        return {
          ...item,
          NotShow: true,
        };
      }

      return item;
    });
  } else if (value === "Existing") {
    UpdatedInput = inputs.map((item, i) => {
      if (item.isname == "NomineeExisting_Aadhaar") {
        return {
          ...item,
          NotShow: false,
        };
      }
      return item;
    });
  } else if (value === "New") {
    UpdatedInput = inputs.map((item, i) => {
      if (item.isname == "NomineeExisting_Aadhaar") {
        return {
          ...item,
          NotShow: true,
        };
      }
      return item;
    });
  }
  return UpdatedInput;
};
