import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

await mongoose.connect(process.env.MONGODB_URI);
console.log('Connected to DB');

const files = mongoose.connection.db.collection('files');

// Find all root folders (parentId: null)
const roots = await files.find({ parentId: null, isDeleted: false }).toArray();
console.log('All root folders found:', roots.map(r => ({ _id: r._id, projectId: r.projectId, name: r.name })));

// Group by projectId
const groups = {};
roots.forEach(r => {
  const key = r.projectId.toString();
  if (!groups[key]) groups[key] = [];
  groups[key].push(r);
});

// Delete duplicates — keep only the first one per project
let deleted = 0;
for (const [projectId, items] of Object.entries(groups)) {
  if (items.length > 1) {
    const toDelete = items.slice(1).map(r => r._id);
    console.log(`Project ${projectId}: deleting ${toDelete.length} duplicate(s):`, toDelete);
    await files.deleteMany({ _id: { $in: toDelete } });
    deleted += toDelete.length;
  }
}

console.log(`Done! Deleted ${deleted} duplicate root folder(s).`);
await mongoose.disconnect();
process.exit(0);

