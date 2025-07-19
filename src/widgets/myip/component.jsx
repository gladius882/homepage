import Block from "components/services/widget/block";
import Container from "components/services/widget/container";
import { useTranslation } from "next-i18next"
import useWidgetAPI from "utils/proxy/use-widget-api";

export default function Component({ service }) {
    const { t } = useTranslation();
    const { widget } = service;
    const { data, error } = useWidgetAPI(widget, "ip");

    if(error) {
        return <Container service={service} error={error}/>
    }

    if(!data) {
        return (
            <Container service={service}>
                <Block label="myip.ip" />
                <Block label="myip.country" />
            </Container>
        )
    }

    return (
        <Container service={service}>
            <Block label="myip.ip" value={data.ip} />
            <Block label="myip.country" value={data.country} />
        </Container>
    )
}