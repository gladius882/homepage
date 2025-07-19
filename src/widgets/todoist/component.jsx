import Block from "components/services/widget/block";
import Container from "components/services/widget/container";
import { useTranslation } from "next-i18next";
import useWidgetAPI from "utils/proxy/use-widget-api";

export default function Component({ service }) {
    const { t } = useTranslation();
    const { widget } = service;
    const { data, error } = useWidgetAPI(widget, "tasks", {
        limit: 10,
        query: "today | overdue"
    });

    if (error) {
        return <Container service={service} error={error} />
    }

    if (!data) {
        return (
            <Container service={service}>
                <Block label="No data" />
            </Container>
        )
    }

    return (
        <>
            <Container service={service}>
                <Block label="Tasks for today" value={data.results.length} />
            </Container>

            <div className="flex flex-col">
                {data.results && data.results.map(task => (
                    <div key={task.id} className="bg-theme-200/50 dark:bg-theme-900/20 rounded-sm m-1 p-1 flex items-center gap-3">
                        <div>{task.content}</div>

                        {task.labels && (
                            <div>
                                {task.labels && (widget.fields === null || widget.fields.includes("label")) && task.labels.map(label => (
                                    <div key={label} className="rounded bg-[white] text-black p-1 text-xs">@{label}</div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>

    )
}