//Read Permision is 1
//Create Permision is 2
//Update Permision is 3
//Delete Permision is 4

// log entry
// assets
// group
// permission
// content type
// bill customer
// ship customer
// lookup
// lookup value
// organization
// product
// organization group
// session
// blacklisted token
// outstanding token
// transaction
// user

export const mockRoles = [
    {
        id: "1",
        name: 'Admin',
        description: 'This is Admin',
        permission: {
            users: [1, 2, 3, 4],
            assets: [1, 2, 3, 4],
            transactions: [1, 2, 3, 4],
            products: [1, 2, 3, 4],
        }
    },
    {
        id: "2",
        name: 'SuperUser',
        description: 'This is SuperUser',
        permission: {
            users: [1],
            assets: [1, 2, 3],
            transactions: [1, 3, 4],
            products: [1, 3, 4],
        }
    },
    {
        id: "3",
        name: 'User',
        description: 'This is User',
        permission: {
            users: [1],
            assets: [1],
            transactions: [1],
            products: [1],
        }
    },
];

