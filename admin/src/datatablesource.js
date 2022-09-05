export const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
        field: "user",
        headerName: "User",
        width: 230,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <img className="cellImg" src={params.row.img || "https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg"} alt="avatar" />
                    {params.row.username}
                </div>
            );
        },
    },
    {
        field: "email",
        headerName: "Email",
        width: 230,
    },

    {
        field: "country",
        headerName: "Country",
        width: 100,
    },

    {
        field: "city",
        headerName: "City",
        width: 100,
    },

    {
        field: "phone",
        headerName: "Phone",
        width: 100,
    },

    // no need of status info
    // {
    //     field: "status",
    //     headerName: "Status",
    //     width: 160,
    //     renderCell: (params) => {
    //         return (
    //             <div className={`cellWithStatus ${params.row.status}`}>
    //                 {params.row.status}
    //             </div>
    //         );
    //     },
    // },
];

export const hotelColumns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
        field: "name",
        headerName: "Name",
        width: 150,
    },
    {
        field: "type",
        headerName: "Type",
        width: 100,
    },
    {
        field: "title",
        headerName: "Title",
        width: 230,
    },
    {
        field: "city",
        headerName: "City",
        width: 100,
    },
];

export const roomColumns = [
    { field: "_id", headerName: "ID", width: 70 },
    {
        field: "title",
        headerName: "Title",
        width: 230,
    },
    {
        field: "desc",
        headerName: "Description",
        width: 200,
    },
    {
        field: "price",
        headerName: "Price",
        width: 100,
    },
    {
        field: "maxPeople",
        headerName: "Max People",
        width: 100,
    },
];