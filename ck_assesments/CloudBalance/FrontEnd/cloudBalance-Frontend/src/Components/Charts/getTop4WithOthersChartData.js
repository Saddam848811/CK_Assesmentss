 export const getTop4WithOthersChartData = (costExplorerData) => {
    const datasetsWithTotal = costExplorerData.datasets.map((dataset) => ({
      ...dataset,
      total: dataset.data.reduce((sum, value) => sum + value, 0),
    }));
    const sorted = datasetsWithTotal.sort((a, b) => b.total - a.total);
    const top4 = sorted.slice(0, 4);
    const remaining = sorted.slice(4);
    const othersData = costExplorerData.labels.map((_, monthIndex) =>
      remaining.reduce((sum, dataset) => sum + dataset.data[monthIndex], 0)
    );

    const othersDataset = {
      label: "Others",
      data: othersData,
      backgroundColor: "#F4D00C",
    };
    return {
      labels: costExplorerData.labels,
      datasets: [...top4.map(({ total, ...rest }) => rest), othersDataset],
    };
  };


 export const getSortedDatasetsByTotal = (datasets) => {
  return datasets
    .map(ds => ({
      ...ds,
      total: ds.data.reduce((sum, val) => sum + val, 0)
    }))
    .sort((a, b) => b.total - a.total);
};

