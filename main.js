const STORAGE_KEY = "completedRows";
			const saved = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"));
			const totalEl = document.getElementById("total");

			// Function to update total
			function updateTotal() {
			let total = 0;
			document.querySelectorAll("tbody tr.completed").forEach(row => {
				total += parseFloat(row.dataset.value) || 0;
			});
			totalEl.textContent = total.toFixed(2) + "%";
			}

			// Initialize rows
			document.querySelectorAll("tbody tr").forEach(row => {
			const key = row.dataset.rowId;
			if (!key) return;

			// restore state
			if (saved.has(key)) {
				row.classList.add("completed");
			}

			row.addEventListener("click", (event) => {
				if (event.target.closest("a")) return; // ignore clicks on links

				const rows = document.querySelectorAll(`tbody tr[data-row-id="${key}"]`);
				const shouldComplete = !row.classList.contains("completed");

				rows.forEach(r => r.classList.toggle("completed", shouldComplete));

				if (shouldComplete) {
				saved.add(key);
				} else {
				saved.delete(key);
				}

				localStorage.setItem(STORAGE_KEY, JSON.stringify([...saved]));
				updateTotal();
			});
			});

			// Reset button
			const resetBtn = document.getElementById("reset-btn");
			resetBtn.addEventListener("click", () => {
			document.querySelectorAll("tbody tr.completed").forEach(row => {
				row.classList.remove("completed");
			});
			saved.clear();
			localStorage.removeItem(STORAGE_KEY);
			updateTotal();
			});

			// Initial total calculation on page load
			updateTotal();