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
                        {task.priority == 4 && (
                            <div className="bg-[#ff7066] size-[10px] rounded"></div>
                        )}

                        {task.priority == 3 && (
                            <div className="bg-[#ff9a13] size-[10px] rounded"></div>
                        )}

                        {task.priority == 2 && (
                            <div className="bg-[#5297ff] size-[10px] rounded"></div>
                        )}

                        {task.priority == 1 && (
                            <div className="bg-[#6b6b6b] size-[10px] rounded"></div>
                        )}

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