import { useNavigate, useLocation } from "react-router-dom";

export default function CategoryDog(props: { name: string }) {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const filterType = queryParams.get("filterType");
    const existingFilters = filterType ? filterType.split(",") : [];
    
    const isSelected = existingFilters.includes(props.name);
    
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
        <div 
            onClick={redirectToFilter}
            style={{
                padding: "8px 12px",
                margin: "4px 0",
                cursor: "pointer",
                backgroundColor: isSelected ? "#00bf8f" : "white",
                color: isSelected ? "white" : "#333333",
                borderRadius: "4px",
                border: isSelected ? "1px solid #009e78" : "1px solid #e0e0e0",
                fontWeight: isSelected ? "bold" : "normal",
                transition: "all 0.2s ease",
                boxShadow: isSelected ? "0 2px 4px rgba(0,0,0,0.1)" : "none"
            }}
            onMouseOver={(e) => {
                if (!isSelected) {
                    e.currentTarget.style.backgroundColor = "#f5f5f5";
                    e.currentTarget.style.borderColor = "#d0d0d0";
                }
            }}
            onMouseOut={(e) => {
                if (!isSelected) {
                    e.currentTarget.style.backgroundColor = "white";
                    e.currentTarget.style.borderColor = "#e0e0e0";
                }
            }}
        >
            {props.name}
        </div>
    );
}
