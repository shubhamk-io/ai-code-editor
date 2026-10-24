export const buildTree = async (files) => {
    let map = {}
    let tree = []

    // 
    files.forEach(file => { // ye file k liye hai 
        // using map to acces parent id and everything
        map[files._id.toString] = {
            ...file.toObject(), // convert string to object
            children: [] // children array
        }
    });

    // Build treee   // esmai saare childrens rahenge

    files.forEach(file => {
        const id = file._id.toString()
        if (file.parentId) {
            const parent = map[file.parentId.toString()]
            if (parent) {
                parent.children.push(map[id])
            } else {
                tree.push(map[id])
            }
        }
    })

    return tree

}