const HandleApiError = (error, showToast, fallbackMessage = "Something went wrong") => {
    if (error.response?.status === 401) {
        showToast("You are not authenticated");
        window.location.href = "/login";
    } else if (error.response?.data?.error) {
        showToast(error.response.data.error);
    } else {
        showToast(fallbackMessage);
    }
}

export default HandleApiError