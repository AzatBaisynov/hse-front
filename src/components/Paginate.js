import React, { useEffect, useState } from 'react';

export const Paginate = ({page, setPage, totalPages }) => {

	const [status, setStatus] = useState(1)

	useEffect(() => {
		statusChecker()
	}, [page, totalPages])

	const statusChecker = () => {
		if (totalPages < 12) {
			setStatus(1)
		} else if (totalPages > 11 && page < 7) {
			setStatus(2)
		} else if (totalPages > 11 && page > 6 && page < totalPages - 6) {
			setStatus(3)
		} else {
			setStatus(4)
		}
	}

	const handleActice = (num) => {
		if (num === page) {
			return " active"
		}
		return ""
	}

	const drowNumbers = () => {

		let arr = []
		for (let i = 1; i < totalPages; i++ ) {
			arr = [...arr, i]
		}

		switch (status) {
			case 1 : return (
				<div className='pagination'>
					<span className='pagination__before' onClick={() => {
						if (page > 0)
							setPage(page - 1)
						setPage(0)
					}}>{"<"}</span>
					{
						arr.map((el, idx) => (
							<span key={idx} className={`pagination__num ${handleActice(el-1)}`}
							onClick={() => {
								setPage(el - 1)
								}} >{el}</span>
						))
					}
					<span className='pagination__after' onClick={() => {
						if (page < totalPages - 1) setPage(page + 1)
						setPage(totalPages - 1)
					}}>{">"}</span>
				</div>
			)
			case 2 : return (
				<div className='pagination'>
					<span className='pagination__before' onClick={() => {
						if (page > 0)
						setPage(page-1)
						setPage(0)
					}}>{"<"}</span>
					<span className={`pagination__num ${handleActice(0)}`}
						onClick={() => setPage(0)}
					>1</span>
					<span className={`pagination__num ${handleActice(1)}`}
						onClick={() => setPage(1)}
					>2</span>
					<span className={`pagination__num ${handleActice(2)}`}
						onClick={() => setPage(2)} 
					>3</span>
					<span className={`pagination__num ${handleActice(3)}`}
						onClick={() => setPage(3)}
					>4</span>
					<span className={`pagination__num ${handleActice(4)}`}
						onClick={() => setPage(4)}
					>5</span>
					<span className={`pagination__num ${handleActice(5)}`}
						onClick={() => setPage(5)}
					>6</span>
					<span className={`pagination__num ${handleActice(6)}`}
						onClick={() => setPage(6)}
					>7</span>
					<span className={`pagination__num ${handleActice(7)}`}
						onClick={() => setPage(7)}
					>8</span>
					<span className='pagination__num'>...</span>
					<span className='pagination__num'
						onClick={() => setPage(arr[arr.length - 2] - 1)}
					>{arr[arr.length - 2]}</span>
					<span className='pagination__num'
						onClick={() => setPage(arr[arr.length - 1] - 1)}
					>{arr[arr.length - 1]}</span>
					<span className='pagination__after'
						onClick={() => {
							if (page < totalPages - 1) setPage(page+1)
							setPage(totalPages - 1)
						}}
					>{">"}</span>
				</div>
			)
			case 3 : return (
				<div className='pagination'>
					<span className='pagination__before' onClick={() => {
						if (page > 0)
							setPage(page - 1)
						setPage(0)
					}}>{"<"}</span>
					<span className='pagination__num'
						onClick={() => setPage(0)}
						id={0}
					>1</span>
					<span className='pagination__num'
						onClick={() => setPage(1)}
						id={1}
					>2</span>
					<span className='pagination__num'>...</span>
					<span className='pagination__num'
						onClick={() => setPage(page-2)}
					>{page -2}</span>
					<span className='pagination__num'
						onClick={() => setPage(page-1)}
					>{page -1}</span>
					<span className={`pagination__num ${handleActice(page)}`}
						onClick={() => setPage(page)}
					>{page}</span>
					<span className='pagination__num'
						onClick={() => setPage(page+1)}
					>{page + 1}</span>
					<span className='pagination__num'
						onClick={() => setPage(page+2)}
					>{page + 2}</span>
					<span className='pagination__num'>...</span>
					<span className='pagination__num'
						onClick={() => setPage(arr[arr.length - 2]-1)}
					>{arr[arr.length - 2]}</span>
					<span className='pagination__num'
						onClick={() => setPage(arr[arr.length - 1] - 1)}
					>{arr[arr.length - 1]}</span>
					<span className='pagination__after'
						onClick={() => {
							if (page < totalPages - 1) setPage(page + 1)
							setPage(totalPages - 1)
						}}
					>{">"}</span>
				</div>
			)
			case 4 : return (
				<div className='pagination'>
					<span className='pagination__before' onClick={() => {
						if (page > 0)
							setPage(page - 1)
						setPage(0)
					}}>{"<"}</span>
					<span className='pagination__num'
						onClick={() => setPage(0)}
					>1</span>
					<span className='pagination__num'
						onClick={() => setPage(1)}
					>2</span>
					<span className='pagination__num'>...</span>
					<span className={`pagination__num ${handleActice(arr[arr.length - 7] - 1)}`}
					>{arr[arr.length - 7]}</span>
					<span className={`pagination__num ${handleActice(arr[arr.length - 6] - 1)}`}
						onClick={() => setPage(arr[arr.length - 6] - 1)}
					>{arr[arr.length - 6]}</span>
					<span className={`pagination__num ${handleActice(arr[arr.length - 5] - 1)}`}
						onClick={() => setPage(arr[arr.length - 5] - 1)}
					>{arr[arr.length - 5]}</span>
					<span className={`pagination__num ${handleActice(arr[arr.length - 4] - 1)}`}
						onClick={() => setPage(arr[arr.length - 4] - 1)}
					>{arr[arr.length - 4]}</span>
					<span className={`pagination__num ${handleActice(arr[arr.length - 3] - 1)}`}
						onClick={() => setPage(arr[arr.length - 3] - 1)}
					>{arr[arr.length - 3]}</span>
					<span className={`pagination__num ${handleActice(arr[arr.length - 2] - 1)}`}
						onClick={() => setPage(arr[arr.length - 2] - 1)}
					>{arr[arr.length - 2]}</span>
					<span className={`pagination__num ${handleActice(arr[arr.length - 1] - 1)}`}
						onClick={() => setPage(arr[arr.length - 1] - 1)}
					>{arr[arr.length - 1]}</span>
					<span className='pagination__after'
						onClick={() => {
							if (page < totalPages - 1) setPage(page + 1)
							setPage(totalPages - 1)
						}}>{">"}</span>
				</div>
			)
		}
	}

	return (
		<div>
			{
				drowNumbers()
			}
		</div>
	)
}