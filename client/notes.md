bg-color: #efede5;
text-color: #0a45a4

form color options :

#848484 and #b4b4ac (shades of brown)

#8da9cd and #b8d0e7 (shades of blue)

<label>Enter Amount to buy: </label>
<input name="amount" />
<button disabled={isbuytxPending} type="submit">
{isbuytxPending ? "Confirming..." : "Buy Dyno"}
</button>
<div>
{buytxhash && <div> Transaction Hash: {buytxhash} </div>}
{isbuytxConfirming && <div> Waiting for confirmation </div>}
{isbuytxConfirmed && <div> Transaction confirmed. </div>}
</div>
