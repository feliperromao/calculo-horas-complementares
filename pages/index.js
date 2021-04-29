import { useMemo, useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import {
    TextField,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Grid,
    Paper,
    AppBar,
    Typography
} from '@material-ui/core';

function Home() {
    const [proventos, setProventos] = useState();
    const [complementares, setComplementares] = useState();
    const [horas, setHoras] = useState(190);
    const [multiplicador, setMultiplicador] = useState(2.5);

    const valorHora = useMemo(() => {
        const value = (proventos / horas) * multiplicador
        return value || 0;
    }, [proventos, horas, multiplicador])

    const totalComplementares = useMemo(() => {
        const value = valorHora * complementares
        return value || 0;
    }, [valorHora, complementares])

    const totalGeral = useMemo(() => {
        const value = parseFloat(totalComplementares) + parseFloat(proventos)
        return value || 0;
    }, [totalComplementares, proventos])

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Typography variant="h6" className={classes.title}>
                    Horas Complementares
                </Typography>
            </AppBar>

            <form className={classes.form} noValidate autoComplete="off">
                <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
                    <Grid item md={6} xs={12}>
                        <TextField
                            onChange={(e) => setProventos(e.target.value)}
                            value={proventos}
                            fullWidth
                            label="Proventos"
                            type="number" />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            onChange={(e) => setComplementares(e.target.value)}
                            value={complementares}
                            fullWidth
                            label="Horas complementares"
                            type="number" />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            onChange={(e) => setHoras(e.target.value)}
                            value={horas}
                            fullWidth
                            label="Carga horária"
                            type="number" />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            onChange={(e) => setMultiplicador(e.target.value)}
                            value={multiplicador}
                            fullWidth
                            label="Multiplicador"
                            type="number" />
                    </Grid>
                </Grid>

            </form>
            <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.thead}>Valor da hora</TableCell>
                            <TableCell className={classes.thead}>Valor complementares</TableCell>
                            <TableCell className={classes.thead}>Total a receber</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>R$: {valorHora.toFixed(2)}</TableCell>
                            <TableCell>R$: {totalComplementares.toFixed(2)}</TableCell>
                            <TableCell>R$: {totalGeral.toFixed(2)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    form: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    title: {
        flexGrow: 1,
        alignSelf: 'flex-start',
    },
    table: {
        minWidth: 650,
    },
    thead: {
        fontWeight: "bold"
    }
}));

export default Home