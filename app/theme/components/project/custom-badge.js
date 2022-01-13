export default {
    baseStyle: {
        ribbon: {
            position: 'absolute',
            top: '10px',
            left: '-11px',
            zIndex: '999',
            display: 'inline-block',
            letterSpacing: '.3rem',
            padding: '3px 15px 5px',
            color: '#fff',
            textAlign: 'center',
            textTransform: 'uppercase',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            fontFamily: "'HK Grotesk', sans-serif",
            backgroundColor: '#17a2b8',

            _before: {
                content: '""',
                borderLeft: '12px solid transparent',
                borderRight: '0 solid transparent',
                borderTop: '14px solid #1460a0',
                position: 'absolute',
                bottom: '-14px',
                left: '0',
            }
        }
    }
}