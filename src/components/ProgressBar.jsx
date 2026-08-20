const ProgressBar = ({ progress }) => {
    return (
        <div className="w-full">

            <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                    Processing PDF...
                </span>

                <span className="text-sm text-gray-500">
                    {progress}%
                </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3">

                <div
                    className="bg-gray-900 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                ></div>

            </div>

        </div>
    );
};

export default ProgressBar;