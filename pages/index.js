import { useMemo, useState } from "react"
import { TextField, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

function Home() {
    const [proventos, setProventos ] = useState(0);
    const [horas, setHoras ] = useState(190);
    const [multiplicador, setMultiplicador] = useState(2.5);
    const [complementares, setComplementares] = useState(0);

    const valorHora = useMemo(() => {
        return (proventos / horas) * multiplicador
    }, [proventos, horas, multiplicador])

    const totalComplementares = useMemo(() => {
        return valorHora * complementares
    }, [valorHora, complementares])

    const totalGeral = useMemo(() => {
        return totalComplementares + proventos
    }, [totalComplementares, proventos])

    return (
        <div>
            <h1>Home</h1>
            <form noValidate autoComplete="off">
                <TextField
                    onChange={(e) => setProventos(e.target.value)}
                    value={proventos}
                    label="Proventos"
                    type="number" />

                <TextField
                    onChange={(e) => setComplementares(e.target.value)}
                    value={complementares}
                    label="Horas complementares"
                    type="number" />

                <TextField
                    onChange={(e) => setHoras(e.target.value)}
                    value={horas}
                    label="Carga horária"
                    type="number" />

                <TextField
                    onChange={(e) => setMultiplicador(e.target.value)}
                    value={multiplicador}
                    label="Multiplicador"
                    type="number" />

            </form>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell component="th">Valor da hora</TableCell>
                            <TableCell component="th">Valor complementares</TableCell>
                            <TableCell component="th">Total a receber</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>{valorHora}</TableCell>
                            <TableCell>{totalComplementares}</TableCell>
                            <TableCell>{totalGeral}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}


export default Home