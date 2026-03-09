import pandas as pd

file = "Acct_Statement_XXXXXXXX1277_13012026.xls"

df = pd.read_excel(file, header=None)

header_row = None

for i, row in df.iterrows():
    row_text = " ".join([str(x) for x in row if pd.notna(x)])
    if "Date" in row_text and "Narration" in row_text:
        header_row = i
        break

if header_row is None:
    raise Exception("Transaction header not found")

df = pd.read_excel(file, header=header_row)

df = df.dropna(subset=["Date"])

df = df.rename(columns={
    "Date": "date",
    "Narration": "description"
})

debit_col = None
credit_col = None

for col in df.columns:
    c = str(col).lower()

    if "debit" in c or "withdraw" in c or c == "dr":
        debit_col = col

    if "credit" in c or "deposit" in c or c == "cr":
        credit_col = col

if debit_col is None and credit_col is None:
    raise Exception("Could not detect debit/credit columns")

# convert to numeric safely
debit = pd.to_numeric(df.get(debit_col), errors="coerce").fillna(0)
credit = pd.to_numeric(df.get(credit_col), errors="coerce").fillna(0)

df["amount"] = credit - debit

df = df[["date", "description", "amount"]]

df.to_csv("statement_real.csv", index=False)

print("Cleaned statement saved to statement_real.csv")
