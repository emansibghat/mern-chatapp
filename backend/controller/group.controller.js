import Group from "../models/Group.model.js";
//import User from "../models/User.model.js";

// Create a new group
export const createGroup = async (req, res) => {
  const { name, members } = req.body;
  const adminId = req.user.id; // Assume `req.user` is set by middleware

  try {
    const group = new Group({
      name,
      members: [adminId, ...members], // Admin is automatically added to the group
      admin: adminId,
    });

    await group.save();

    res.status(201).json({
      message: "Group created successfully",
      group,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create group" });
  }
};

// Get all groups of a user
export const getUserGroups = async (req, res) => {
  const userId = req.user.id;

  try {
    const groups = await Group.find({ members: userId }).populate("members", "fullname email");

    res.status(200).json(groups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch groups" });
  }
};

// Add a member to a group
export const addMember = async (req, res) => {
  const { groupId, userId } = req.body;

  try {
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    if (group.members.includes(userId)) {
      return res.status(400).json({ message: "User is already a member of the group" });
    }

    group.members.push(userId);
    await group.save();

    res.status(200).json({
      message: "User added to the group successfully",
      group,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add user to the group" });
  }
};
