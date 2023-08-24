import { useNavigate, useLocation } from "react-router-dom";
export default function CategoryDog(props: { name: string }) {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const filterType = queryParams.get("filterType");
    const existingFilters = filterType ? filterType.split(",") : [];
    const redirectToFilter = () => {
        let updatedFilters = existingFilters;

        // Check if the filter is already present, remove it; otherwise, add it
        if (updatedFilters.includes(props.name)) {
            updatedFilters = updatedFilters.filter((filter) => filter !== props.name);
        } else {
            updatedFilters.push(props.name);
        }

        // Construct the updated filterType string
        const updatedFilterType = updatedFilters.join(",");

        navigate(`/?filterType=${updatedFilterType}`);
    };
    return (
        <div className="CategoryDog" onClick={redirectToFilter} style={existingFilters.includes(props.name) ? { backgroundColor: "#e0e0e0" } : {}}>
            {props.name}
        </div>
    );
}
