export const buildTree = async (files) => {
    let map = {}
    let tree = []

    files.forEach(file => {
        map[file._id.toString()] = {
            ...file.toObject(),
            children: []
        }
    });

    const seenRoots = new Set()
    files.forEach(file => {
        const id = file._id.toString()
        if (file.parentId) {
            const parent = map[file.parentId.toString()]
            if (parent) parent.children.push(map[id])
        } else {
            if (!seenRoots.has(file.projectId.toString())) {
                seenRoots.add(file.projectId.toString())
                tree.push(map[id])
            }
        }
    })

    return tree
}